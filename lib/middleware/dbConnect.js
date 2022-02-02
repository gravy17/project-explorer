import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
  throw new Error(
    'No environment variable for Database'
  );
}

let indexesCreated = false;
async function createIndexes(db) {
  await Promise.all([
    db.collection('projects')
      .createIndex({ name: "text", abstract: "text", authors: "text", tags: "text" }),
    db.collection('programs')
      .createIndex({ name: 1 }),
    db.collection('users')
      .createIndex({ email: 1 }, {unique: true})
  ]);
  indexesCreated = true;
}

let cached = global.mongoose;

if(!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}
 
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false
    };
    mongoose.set("bufferCommands", false);
    mongoose.connection.on('error', err => {
      console.error(err);
    });
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      console.log("Connected to Db!");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  if (!indexesCreated) await createIndexes(cached.conn.client.db);
  return cached.conn;
}

global.mongo = global.mongo || {};
export async function getSessionClient() {
  if(!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI);
  }
  await global.mongo.client.connect();
  return global.mongo.client;
}

export default dbConnect;