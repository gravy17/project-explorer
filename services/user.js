import { ObjectId } from "mongodb";
import User from "../models/user";
import { translateError } from "../models/mongo_helper";
import dbConnect from "../lib/middleware/dbConnect";

export async function create({ firstname, lastname, email, password, matricNumber, program, graduationYear }) {
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
    await dbConnect();
    let created = await newUser.save();
    delete created.password;
    delete created.salt;
    return [true, created];
  } catch (error) {
    return [false, translateError(error)];
  }
};

export async function authenticate(email, password) {
  await dbConnect();
  const user = await User.findOne({ email: email });
  if (user && user.validPassword(password)) {
    user.password = null;
    user.salt = null;
    return [true, user];
  } else {
    return [false, ["Invalid email/password"]];
  }
};

export async function getById(id) {
  await dbConnect();
  return await User.findById(id, { projection: {password: 0, salt: 0 } }).lean();
};

const getAll = async() => {
  return await User.find({}, { projection: {password: 0, salt: 0 } }).lean();
};

export async function trackView(userid, project_view) {
  let res;
  try { 
    const upsertFilter = { _id: userid, 'project_views.project_id': { $ne: project_view.project_id} };
    const upsertQuery = { $push: {project_views: project_view}};
    await dbConnect();
    res = await User.updateOne(upsertFilter, upsertQuery);
    if(res.matchedCount === 0) {
      const updateFilter = { _id: userid, 'project_views.project_id': project_view.project_id };
      const updateQuery = { $set: { 'project_views.$.last_view': project_view.last_view} }
      res = await User.updateOne(updateFilter, updateQuery);
    }
  } catch (err) {
    console.log(err);
  } finally {
    return res.modifiedCount;
  }
};

export async function getViewHistory(id) {
  await dbConnect();
  return await User.findById(id).select('project_views -_id');
}

export async function deleteUser(user) {
  await dbConnect();
  return await User.deleteOne({ _id:  ObjectId(user._id) });
}