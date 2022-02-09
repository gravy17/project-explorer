import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import Project from '../../models/project';
import User from '../../models/user';
import Program from '../../models/program';

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
  throw new Error(
    'No environment variable for Database'
  );
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
    mongoose.set("bufferCommands", true);
    mongoose.connection.on('error', err => {
      console.error(err);
    });
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      console.log("Connected to Db!");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
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