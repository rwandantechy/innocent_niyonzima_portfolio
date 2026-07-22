const { getDb } = require('../db/mongoClient');
const { validateBlog, asStringArray } = require('../validation');

function normalizeBlog(payload = {}) {
  return {
    title: String(payload.title || '').trim(),
    slug: payload.slug ? String(payload.slug).trim() : '',
    content: String(payload.content || payload.excerpt || '').trim(),
    excerpt: String(payload.excerpt || '').trim(),
    tags: asStringArray(payload.tags),
    featured: Boolean(payload.featured),
    published: payload.published === undefined ? false : Boolean(payload.published),
    readTime: payload.readTime || '',
    updatedAt: new Date(),
  };
}

exports.getAll = async ({ publishedOnly = false } = {}) => {
  const db = getDb();
  const filter = publishedOnly ? { published: true } : {};
  return db.collection('blogs').find(filter).sort({ createdAt: -1 }).toArray();
};

exports.getById = async (id, { publishedOnly = false } = {}) => {
  const db = getDb();
  const filter = publishedOnly ? { id, published: true } : { id };
  return db.collection('blogs').findOne(filter);
};

exports.create = async (payload) => {
  validateBlog(payload);
  const db = getDb();
  const newItem = {
    id: payload.id ? String(payload.id) : `${Date.now()}`,
    authorId: payload.authorId || null,
    createdAt: new Date(),
    ...normalizeBlog(payload),
  };
  await db.collection('blogs').insertOne(newItem);
  return newItem;
};

exports.update = async (id, payload) => {
  validateBlog(payload);
  const db = getDb();
  await db.collection('blogs').updateOne({ id }, { $set: normalizeBlog(payload) });
  return db.collection('blogs').findOne({ id });
};

exports.remove = async (id) => {
  const db = getDb();
  const result = await db.collection('blogs').deleteOne({ id });
  return result.deletedCount > 0;
};
