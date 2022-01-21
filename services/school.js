import Program, { find, findOne } from "../models/program";
import { translateError } from "../models/mongo_helper";

/* Add to list of programs */
const addProgram = async({ name, accredYear }) => {
  const program = new Program({ name, accredYear });
  try{
    let created = await program.save();
    return [true, created];
  } catch (error) {
    return [false, translateError(error)];
  }
};

/* Get the list of all projects */
const getAll = async() => {
  try {
    return await find({}).lean();
  }
  catch(err) {
    console.log(translateError(err)) ;
  }
};

const findOldest = async() => {
  try {
    return await findOne().sort('accredYear').lean();
  }
  catch(err) {
    console.log(translateError(err)) ;
  }
}

export async function getPrograms(){
  let strArr = [ "Computer Science", "Computer Information Systems", "Computer technology" ];
  const objArr = await getAll();
  if(objArr){
    strArr = objArr.map((obj) => {
      obj.name
    })
  }
  console.log(strArr);
  return strArr;
}

/** Get list of grad years */
export async function getGradYears(){
  let yearsArr = ["2017", "2018", "2019", "2020", "2021", "2022"];
  const firstGradYr = await findOldest();
  let currentYear = new Date().getFullYear();
  if(firstGradYr){ 
    yearsArr = [];
    for(i = firstGradYr; i <= currentYear+1; i++) {
      yearsArr.push(i)
    } 
  }
  return yearsArr;
}
