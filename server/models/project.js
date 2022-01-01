const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    name: { type: String, required: true },
    abstract: { type: String, required: true },
    authors: { type: [String], required: true, unique: true },
    tags: [String],
    createdBy: { type: mongoose.Types.ObjectId, required: true, ref: "User" }
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;