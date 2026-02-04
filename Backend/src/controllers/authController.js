const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });
    // Do not return password or hashed password
    const { password: _p, ...safeUser } = user;
    // issue token
    const token = jwt.sign({ id: safeUser.id, email: safeUser.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    return res.status(201).json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const { password: _p, ...safeUser } = user;
    const token = jwt.sign({ id: safeUser.id, email: safeUser.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    return res.json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
};
