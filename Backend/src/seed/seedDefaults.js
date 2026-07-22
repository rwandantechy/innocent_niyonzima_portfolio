const { getDb } = require('../db/mongoClient');
const logger = require('../utils/logger');
const {
  defaultProjects,
  defaultBlogs,
  defaultSkills,
  defaultExperience,
} = require('./defaultContent');

async function seedCollectionIfEmpty(collectionName, records) {
  const db = getDb();
  const collection = db.collection(collectionName);
  const count = await collection.countDocuments();

  if (count > 0) return { inserted: 0, skipped: true };

  const now = new Date();
  const documents = records.map((record) => ({
    ...record,
    published: record.published === undefined ? true : Boolean(record.published),
    createdAt: now,
    updatedAt: now,
  }));

  const result = await collection.insertMany(documents);
  return { inserted: result.insertedCount || 0, skipped: false };
}

/** Existing docs without published should stay visible on the public site. */
async function backfillPublishedFlag(collectionName) {
  const db = getDb();
  const result = await db.collection(collectionName).updateMany(
    { published: { $exists: false } },
    { $set: { published: true } }
  );
  return result.modifiedCount || 0;
}

async function seedDefaultsIfEmpty() {
  const collections = ['projects', 'blogs', 'skills', 'experience'];
  const backfilled = {};
  for (const name of collections) {
    backfilled[name] = await backfillPublishedFlag(name);
  }

  const [projects, blogs, skills, experience] = await Promise.all([
    seedCollectionIfEmpty('projects', defaultProjects),
    seedCollectionIfEmpty('blogs', defaultBlogs),
    seedCollectionIfEmpty('skills', defaultSkills),
    seedCollectionIfEmpty('experience', defaultExperience),
  ]);

  logger.info(
    `Default content seed status -> projects: ${projects.skipped ? 'skipped' : projects.inserted}, blogs: ${
      blogs.skipped ? 'skipped' : blogs.inserted
    }, skills: ${skills.skipped ? 'skipped' : skills.inserted}, experience: ${
      experience.skipped ? 'skipped' : experience.inserted
    }`
  );
  logger.info(
    `Published backfill -> projects: ${backfilled.projects}, blogs: ${backfilled.blogs}, skills: ${backfilled.skills}, experience: ${backfilled.experience}`
  );
}

module.exports = {
  seedDefaultsIfEmpty,
};
