const { MongoClient, ServerApiVersion } = require('mongodb');
const logger = require('../utils/logger');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || '';

if (!MONGO_URI) {
  logger.warn('No MONGO_URI found in environment. DB operations will fail until it is set.');
}

let client;
let dbInstance;

async function connectToDb() {
  if (dbInstance) return dbInstance;
  client = new MongoClient(MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();
  // prefer explicit DB name from env if provided, otherwise use the DB encoded in the URI
  const dbName = process.env.DB_NAME || undefined;
  const defaultDb = dbName ? client.db(dbName) : client.db();
  dbInstance = defaultDb;
  logger.info('MongoDB connected');
  return dbInstance;
}

function getDb() {
  if (!dbInstance) throw new Error('Database not initialized. Call connectToDb first.');
  return dbInstance;
}

async function closeConnection() {
  if (client) await client.close();
  client = null;
  dbInstance = null;
}

module.exports = {
  connectToDb,
  getDb,
  closeConnection,
};
