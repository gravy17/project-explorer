import { ObjectId } from "mongodb";

import Project, { findById, find, aggregate, deleteOne } from "../models/project";
import { translateError } from "../models/mongo_helper";
import { generatePipeline } from "../lib/utils/searchQuery";

/* Create new project */
const create = async({ name, abstract, authors, tags, createdBy }) => {
  const project = new Project({
    name,
    abstract,
    authors,
    tags,
    createdBy
  });
  try{
    let created = await project.save();
    return [true, created];
  } catch (error) {
    return [false, translateError(error)];
  }
};

/* Return project with specified id */
const getById = async(id) => {
  try {
    return await findById(id).populate('createdBy').lean();
  }
  catch(err) {
    console.log(translateError(err)) ;
  }
};

/* Return all projects */
const getAll = async() => {
  try {
    return await find({}).lean();
  }
  catch(err) {
    console.log(translateError(err)) ;
  }
};

const getShowcase = async() => {
  try {
    return await find({}).limit(4).sort({createdAt: -1}).lean();
  }
  catch(err) {
    console.log(translateError(err)) ;
  }
};

/* Return projects matching a search term */
const searchByCriteria = async(query) => {
  const pipeline = generatePipeline(query);
  try {
    const results = await aggregate(pipeline).exec();
    return [true, results];
  }
  catch(error) {
    return [false, translateError(error)];
  }
};

const deleteProject = async(project) => {
  return await deleteOne({ _id: ObjectId(project._id) });
}

export default {
  getAll,
  getShowcase,
  create,
  getById,
  searchByCriteria,
  deleteProject
};
