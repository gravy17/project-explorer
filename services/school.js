import dbConnect from "../lib/middleware/dbConnect";
import Program from "../models/program";
import { translateError } from "../models/mongo_helper";


let cached = global.school;
let today = new Date();
let expiry = new Date(today);
expiry.setDate(expiry.getDate() + 1);
expiry.setHours(0,0,0,0);

if(!cached) {
  cached = global.school = { programs: null, gradYears: null }
}

const cacheClear = setInterval(() => {
  if( new Date() >= expiry ){
    cached.programs = null;
    cached.gradYears = null;
    today = new Date();
    expiry = new Date(today);
    expiry.setDate(expiry.getDate() + 1);
    expiry.setHours(0,0,0,0);
  }
}, 1000*60*60);
cacheClear.unref();

export const addProgram = async({ name, accredYear }) => {
  const program = new Program({ name, accredYear });
  try{
    await dbConnect();
    let created = await program.save();
    return [true, created];
  } catch (error) {
    console.log(translateError(error));
    return [false, translateError(error)];
  }
};

const findOldest = async() => {
  try {
    return await Program.findOne().sort('accredYear').lean();
  }
  catch(err) {
    console.log(translateError(err)) ;
  }
}

export async function getPrograms(){
  if (cached.programs) {
    return cached.programs;
  }
  let programsArr = [];
  await dbConnect();
  const objArr = await Program.find({}).lean();
  if(objArr){
    objArr.map(({name}) => {
      programsArr.push(name);
    })
  }
  cached.programs = programsArr.sort();
  return programsArr;
}

export async function getGradYears(){
  if (cached.gradYears) {
    return cached.gradYears;
  }
  let yearsArr = [];
  await dbConnect();
  const firstGradYr = (await findOldest())?.accredYear;
  let currentYear = new Date().getFullYear();
  if(firstGradYr){
    for(let i = firstGradYr; i <= currentYear+1; i++) {
      yearsArr.push(i)
    } 
  }
  cached.gradYears = yearsArr;
  return yearsArr;
}