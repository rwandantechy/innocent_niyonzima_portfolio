const { getDb } = require('../db/mongoClient');

exports.getAll = async () => {
  const db = getDb();
  const items = await db.collection('projects').find().toArray();
  return items;
};

exports.getById = async (id) => {
  const db = getDb();
  const item = await db.collection('projects').findOne({ id: id });
  return item;
};

exports.create = async (payload) => {
  const db = getDb();
  const newItem = {
    id: `${Date.now()}`,
    title: payload.title || 'Untitled',
    description: payload.description || '',
    tags: payload.tags || []
  };
  await db.collection('projects').insertOne(newItem);
  return newItem;
};
