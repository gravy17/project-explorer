const mongoose = require('mongoose');
const crypto = require('crypto');

//schema for storing latest project views for each user
const ViewSchema = new mongoose.Schema({
    project_id: { type:  mongoose.Types.ObjectId, unique: true, index: true},
    last_view: Date
}, { _id : false }); //should not have a generated id

const UserSchema = new mongoose.Schema({
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
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    } else {
        throw Error('Password should have at least 7 characters');
    }
};

UserSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return hash === this.password;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;