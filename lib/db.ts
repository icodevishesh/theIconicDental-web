import mongoose from "mongoose";

/**
 * Mongoose connection singleton.
 *
 * Next.js hot-reloads modules in development, which would otherwise open a new
 * database connection on every change and quickly exhaust the Atlas pool. We
 * cache the connection promise on the global object so it survives reloads.
 */

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || "iconic-web";

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not set. Add it to your .env file.");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URL as string, {
      dbName: DB_NAME,
      bufferCommands: false,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}
