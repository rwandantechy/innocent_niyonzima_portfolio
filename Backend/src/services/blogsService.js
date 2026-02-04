const { getDb } = require('../db/mongoClient');

exports.getAll = async () => {
  const db = getDb();
  return await db.collection('blogs').find().sort({ createdAt: -1 }).toArray();
};

exports.getById = async (id) => {
  const db = getDb();
  return await db.collection('blogs').findOne({ id });
};

exports.create = async (payload) => {
  const db = getDb();
  const blogs = db.collection('blogs');
  const newItem = {
    id: `${Date.now()}`,
    title: payload.title || 'Untitled',
    content: payload.content || '',
    tags: payload.tags || [],
    authorId: payload.authorId || null,
    createdAt: new Date()
  };
  await blogs.insertOne(newItem);
  return newItem;
};
