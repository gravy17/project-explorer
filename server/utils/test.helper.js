// Import models and services
require('dotenv').config();
const faker = require("faker");
const userService = require('../services/user');
const projectService = require('../services/project');

/**
 * Registers a generated user for user actions
 * @returns {User} fake user
 */
const registerFakeUser = async() => {
    let user = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        program: faker.random.arrayElement([
            "Computer Science",
            "Computer Information Systems",
            "Computer technology"
        ]),
        matricNumber: faker.random.arrayElement(["11", "12", "13", "14", "15", "16"])+'/'+faker.finance.account(4),
        graduationYear: faker.random.arrayElement(["2015", "2016", "2017", "2018", "2019", "2020"])
    }
    const [success, registeredUser] = await userService.create(user);
    if(success){
        return registeredUser;
    }
}

/**
 * Saves a generated project for testing with a provided user and tag
 * @param {User} user
 * @param {string} tag
 * @returns {Project} fake project
 */
const generateProject = async(user, tag) => {
    let project = {
        name: faker.lorem.sentence(6),
        abstract: faker.lorem.paragraph(),
        authors: [faker.name.firstName() + ' ' + faker.name.lastName()],
        tags: [tag, faker.lorem.word()],
        createdBy: user._id
    }
    const [success, generatedProject] = await projectService.create(project);
    if(success){
        return generatedProject;
    }
}

/**
 * Saves N generated projects for testing through a provided user and tag
 * @param {User} user
 * @param {string} tag
 * @param {Number} n
 * @returns {[Project]} fake projects
 */
const generateProjects = async(user, tag, n) => {
    let generatedProjects = [];
    do {
        let gen = await generateProject(user, tag);
        generatedProjects.push(gen);
    } while (generatedProjects.length < n)
    return generatedProjects;
}

/**
 * Deletes all projects in an array (of faked projects)
 * @param {[Project]} projectArray
 */
const clearFakeProjects = async(projects) => {
    projects.forEach(async(project) => {
        await projectService.deleteProject(project);
    });
}

/**
 * Deletes a (fake)user
 * @param {User} user
 */
const deleteFakeUser = async(user) => await userService.deleteUser(user);

module.exports = {
    registerFakeUser,
    generateProject,
    generateProjects,
    clearFakeProjects,
    deleteFakeUser
};

 