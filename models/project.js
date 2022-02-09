import { Schema, Types, models, model } from "mongoose";

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  abstract: { type: String, required: true },
  authors: { type: [String], required: true, unique: true },
  tags: [String],
  createdBy: { type: Types.ObjectId, required: true, ref: "User" }
}, { timestamps: true });

ProjectSchema.index({ name: "text", abstract: "text", authors: "text", tags: "text" })

const Project = models.Project || model('Project', ProjectSchema);

export default Project;