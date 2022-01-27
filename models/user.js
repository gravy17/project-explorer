import { Schema, Types, models, model } from 'mongoose';
import { randomBytes, pbkdf2Sync } from 'crypto';

//schema for storing latest project views for each user
const ViewSchema = new Schema({
  project_id: { type:  Types.ObjectId, unique: true, index: true},
  last_view: Date
}, { _id : false }); //should not have a generated id

const UserSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  salt: {type: String, required: true},
  matricNumber: {type: String, required: true},    
  program: String,
  graduationYear: String,
  project_views: [ViewSchema]
}, { timestamps: true });

UserSchema.methods.setPassword = function(password) {
  if (password.length >= 7) {
    this.salt = randomBytes(16).toString('hex');
    this.password = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  } else {
    throw Error('Password should have at least 7 characters');
  }
};

UserSchema.methods.validPassword = function(password) {
  const hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return hash === this.password;
}

const User = models.User || model("User", UserSchema);

export default User;