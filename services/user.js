import { ObjectId } from "mongodb";
import User, { findOne, findById, find, updateOne, deleteOne } from "../models/user";
import { translateError } from "../models/mongo_helper";

 
/* Creates new user */
const create = async({ firstname, lastname, email, password, matricNumber, program, graduationYear }) => {
  const newUser = new User({
    firstname,
    lastname,
    email,
    matricNumber,
    program,
    graduationYear
  });
  try{
    newUser.setPassword(password);
    let created = await newUser.save();
    return [true, created];
  } catch (error) {
    return [false, translateError(error)];
  }
};

/* Authenticate a user */
const authenticate = async(email, password) => {
  const user = await findOne({ email: email }, { projection: {password: 0, salt: 0 } });
  if (user && user.validPassword(password)) {
    return [true, user];
  } else {
    return [false, ["Invalid email/password"]];
  }
};

/* Return user with specified id */
const getById = async(id) => {
  return await findById(id, { projection: {password: 0, salt: 0 } }).lean();
};

/* Return all users */
const getAll = async() => {
  return await find({}, { projection: {password: 0, salt: 0 } }).lean();
};

/* Update a user with viewed project data*/
const trackView = async(userid, project_view) => {
  let res;
  try { 
    //attempts to insert a new subdocument for first view
    const upsertFilter = { _id: userid, 'project_views.project_id': { $ne: project_view.project_id} };
    const upsertQuery = { $push: {project_views: project_view}};
    res = await updateOne(upsertFilter, upsertQuery);
    if(res.matchedCount === 0) {
      //attempts to update an existing subdocument for subsequent views
      const updateFilter = { _id: userid, 'project_views.project_id': project_view.project_id };
      const updateQuery = { $set: { 'project_views.$.last_view': project_view.last_view} }
      res = await updateOne(updateFilter, updateQuery);
    }
  } catch (err) {
    console.log(err);
  } finally {
    return res.modifiedCount;
  }
};

/*Return array of project views */
const getViewHistory = async(id) => {
  return await findById(id).select('project_views -_id');
}

/* Delete a user */
const deleteUser = async(user) => {
  return await deleteOne({ _id: ObjectId(user._id) });
}

export default {
  create,
  authenticate,
  getById,
  getAll,
  trackView,
  getViewHistory,
  deleteUser
};
