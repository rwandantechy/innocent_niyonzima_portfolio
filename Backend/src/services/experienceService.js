const { getDb } = require('../db/mongoClient');
const { validateExperience, asStringArray } = require('../validation');
const { defaults } = require('../models/experienceModel');

function normalizeExperience(payload = {}) {
  const endDate =
    payload.endDate === undefined || payload.endDate === null || payload.endDate === ''
      ? null
      : String(payload.endDate).trim();

  return {
    role: String(payload.role || '').trim(),
    company: String(payload.company || '').trim(),
    location: String(payload.location || '').trim(),
    startDate: String(payload.startDate || '').trim(),
    endDate,
    concurrent: payload.concurrent === undefined ? defaults.concurrent : Boolean(payload.concurrent),
    bullets: asStringArray(payload.bullets),
    logo: payload.logo ? String(payload.logo).trim() : '',
    order: payload.order === undefined || payload.order === null ? defaults.order : Number(payload.order),
    published: payload.published === undefined ? defaults.published : Boolean(payload.published),
    updatedAt: new Date(),
  };
}

exports.getAll = async ({ publishedOnly = false } = {}) => {
  const db = getDb();
  const filter = publishedOnly ? { published: true } : {};
  return db.collection('experience').find(filter).sort({ order: 1, createdAt: -1 }).toArray();
};

exports.getById = async (id, { publishedOnly = false } = {}) => {
  const db = getDb();
  const filter = publishedOnly ? { id, published: true } : { id };
  return db.collection('experience').findOne(filter);
};

exports.create = async (payload) => {
  validateExperience(payload);
  const db = getDb();
  const collection = db.collection('experience');

  let order = payload.order;
  if (order === undefined || order === null) {
    const last = await collection.find().sort({ order: -1 }).limit(1).toArray();
    order = last[0] ? Number(last[0].order || 0) + 1 : 0;
  }

  const newItem = {
    id: payload.id ? String(payload.id) : `${Date.now()}`,
    createdAt: new Date(),
    ...normalizeExperience({ ...payload, order }),
  };
  await collection.insertOne(newItem);
  return newItem;
};

exports.update = async (id, payload) => {
  validateExperience(payload);
  const db = getDb();
  await db.collection('experience').updateOne({ id }, { $set: normalizeExperience(payload) });
  return db.collection('experience').findOne({ id });
};

exports.reorder = async (orderedIds = []) => {
  if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
    const err = new Error('orderedIds must be a non-empty array');
    err.status = 400;
    throw err;
  }

  const db = getDb();
  const collection = db.collection('experience');
  const ops = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { id: String(id) },
      update: { $set: { order: index, updatedAt: new Date() } },
    },
  }));
  await collection.bulkWrite(ops);
  return collection.find().sort({ order: 1 }).toArray();
};

exports.remove = async (id) => {
  const db = getDb();
  const result = await db.collection('experience').deleteOne({ id });
  return result.deletedCount > 0;
};
