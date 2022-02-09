import { Schema, models, model } from "mongoose";

const ProgramSchema = new Schema({
  name: { type: String, required: true, unique: true, index: true },
  accredYear: { type: Number, required: true }
}, { timestamps: false });

const Program = models.Program || model('Program', ProgramSchema);

export default Program;