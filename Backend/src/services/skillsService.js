const { getDb } = require('../db/mongoClient');
const { validateSkill, asStringArray } = require('../validation');

function normalizeSkillCategory(payload = {}) {
  return {
    title: String(payload.title || '').trim(),
    skills: asStringArray(payload.skills),
    published: payload.published === undefined ? false : Boolean(payload.published),
    updatedAt: new Date(),
  };
}

exports.getAll = async ({ publishedOnly = false } = {}) => {
  const db = getDb();
  const filter = publishedOnly ? { published: true } : {};
  return db.collection('skills').find(filter).sort({ createdAt: 1 }).toArray();
};

exports.create = async (payload) => {
  validateSkill(payload);
  const db = getDb();
  const item = {
    id: payload.id ? String(payload.id) : `${Date.now()}`,
    createdAt: new Date(),
    ...normalizeSkillCategory(payload),
  };
  await db.collection('skills').insertOne(item);
  return item;
};

exports.update = async (id, payload) => {
  validateSkill(payload);
  const db = getDb();
  await db.collection('skills').updateOne({ id }, { $set: normalizeSkillCategory(payload) });
  return db.collection('skills').findOne({ id });
};

exports.remove = async (id) => {
  const db = getDb();
  const result = await db.collection('skills').deleteOne({ id });
  return result.deletedCount > 0;
};
