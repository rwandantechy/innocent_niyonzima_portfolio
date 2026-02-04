const { getDb } = require('../db/mongoClient');
const bcrypt = require('bcryptjs');

// users collection-based auth
exports.register = async ({ name, email, password }) => {
  const db = getDb();
  const users = db.collection('users');
  const exists = await users.findOne({ email });
  if (exists) {
    const err = new Error('User already exists');
    err.status = 409;
    throw err;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: `${Date.now()}`, name, email, password: hashed, createdAt: new Date() };
  await users.insertOne(user);
  const { password: _p, ...safe } = user;
  return safe;
};

exports.login = async (email, password) => {
  const db = getDb();
  const users = db.collection('users');
  const user = await users.findOne({ email });
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  return user;
};
