import { MongoClient, Db, MongoClientOptions, Collection } from 'mongodb';

const rawUri = process.env.MONGO_URI || process.env.MONGO_URL;
if (!rawUri) {
  throw new Error('MONGO_URL or MONGO_URI environment variable is required');
}
const MONGO_URI: string = rawUri;
const DB_NAME = process.env.DB_NAME || 'iconic';

interface CachedDb {
  client: MongoClient;
  db: Db;
  contact: Collection;
  positions: Collection;
  blogs: Collection;
  candidates: Collection;
}

let cachedDb: CachedDb | null = null;

export async function connectToDatabase(): Promise<CachedDb> {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(MONGO_URI, {
    // These options are now the default in MongoDB Node.js Driver v4+
  } as MongoClientOptions);

  const db = client.db(DB_NAME);

  cachedDb = {
    client,
    db,
    contact: db.collection('contact'),
    positions: db.collection('positions'),
    blogs: db.collection('blogs'),
    candidates: db.collection('candidates')
  };

  return cachedDb;
}
