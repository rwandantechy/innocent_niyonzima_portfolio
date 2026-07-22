const { getDb } = require('../db/mongoClient');
const { validateProject, asStringArray } = require('../validation');

function normalizeProject(payload = {}) {
  return {
    title: String(payload.title || '').trim(),
    description: String(payload.description || '').trim(),
    featured: Boolean(payload.featured),
    published: payload.published === undefined ? false : Boolean(payload.published),
    tech: asStringArray(payload.tech || payload.tags),
    metrics: Array.isArray(payload.metrics) ? payload.metrics : [],
    challenges: Array.isArray(payload.challenges) ? payload.challenges : [],
    solutions: Array.isArray(payload.solutions) ? payload.solutions : [],
    results: Array.isArray(payload.results) ? payload.results : [],
    links: payload.links && typeof payload.links === 'object' ? payload.links : {},
    updatedAt: new Date(),
  };
}

exports.getAll = async ({ publishedOnly = false } = {}) => {
  const db = getDb();
  const filter = publishedOnly ? { published: true } : {};
  return db.collection('projects').find(filter).toArray();
};

exports.getById = async (id, { publishedOnly = false } = {}) => {
  const db = getDb();
  const filter = publishedOnly ? { id, published: true } : { id };
  return db.collection('projects').findOne(filter);
};

exports.create = async (payload) => {
  validateProject(payload);
  const db = getDb();
  const newItem = {
    id: payload.id ? String(payload.id) : `${Date.now()}`,
    createdAt: new Date(),
    ...normalizeProject(payload),
  };
  await db.collection('projects').insertOne(newItem);
  return newItem;
};

exports.update = async (id, payload) => {
  validateProject({ ...payload, title: payload.title, description: payload.description, tech: payload.tech || payload.tags });
  const db = getDb();
  const update = normalizeProject(payload);
  await db.collection('projects').updateOne({ id }, { $set: update });
  return db.collection('projects').findOne({ id });
};

exports.remove = async (id) => {
  const db = getDb();
  const result = await db.collection('projects').deleteOne({ id });
  return result.deletedCount > 0;
};
