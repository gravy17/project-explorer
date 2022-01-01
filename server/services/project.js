const Project = require("../models/project");
const {translateError} = require("../models/mongo_helper");
const {generatePipeline} = require("../utils/searchQuery");
const { ObjectId } = require("mongodb");

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
    return await Project.findById(id).populate('createdBy').lean();
  }
  catch(err) {
    console.log(translateError(err)) ;
  }
};
/* Return all projects */
const getAll = async() => {
  try {
    return await Project.find({}).lean();
  }
  catch(err) {
    console.log(translateError(err)) ;
  }
};

/* Return projects matching a search term */
const searchByCriteria = async(query) => {
  const pipeline = generatePipeline(query);
  try {
    const results = await Project.aggregate(pipeline).exec();
    return [true, results];
  }
  catch(error) {
    return [false, translateError(error)];
  }
};

const deleteProject = async(project) => {
  return await Project.deleteOne({ _id: ObjectId(project._id) });
}

module.exports = {
  getAll,
  create,
  getById,
  searchByCriteria,
  deleteProject
};
