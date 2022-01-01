/**
 * @jest-environment node
 */
const mongoose= require('mongoose');
const { searchByCriteria } = require('../services/project');
const testHelper = require('../utils/test.helper');

let testUser;
let generatedProjectsOfSameTag;

beforeAll(async() => {
    mongoose.connect(process.env.TEST_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }, (err) => {
        if (err) {
            console.log("Error connecting to Test db: ", err);
        } else {
            console.log(`Connected to Test DB! Starting tests...`);
        }
    });
    testUser = await testHelper.registerFakeUser();
    generatedProjectsOfSameTag = await testHelper.generateProjects(testUser, 'fake', 20);
    console.log(`Fake user: ${testUser}\nFake Projects (tagged \'fake\'): ${generatedProjectsOfSameTag.length}
    \nThese should have been deleted at the end of the Test Suite`);
});

afterAll(async() => {
    await testHelper.clearFakeProjects(generatedProjectsOfSameTag);
    await testHelper.deleteFakeUser(testUser);
    testUser = generatedProjectsOfSameTag = null;
    mongoose.connection.close();
});


// Tests to ensure the server can return paginated results when searching
// for a project by a substring of its name, abstract, authors or tags 
describe('Search Functionality in the Models, Services and Controllers', () => {
    
    it('Should return a newly saved project in a full or partial search by all criteria', async() => {
    // Setup: Save a project, Prepare search query
    const testProj = generatedProjectsOfSameTag[generatedProjectsOfSameTag.length-1];
    const query = { page: 1, page_size: 8 }
    // Act: request the search method on project service for each criteria
    const [foundTag, tagResults] = await searchByCriteria({...query, criteria: 'tags', searchTerm: testProj.tags[1]});
    const [foundAuthor, authorResults] = await searchByCriteria({...query, criteria: 'authors', searchTerm: testProj.authors[0].toUpperCase()})
    const [foundAbstract, abstractResults] = await searchByCriteria({...query, criteria: 'abstract', searchTerm: testProj.abstract.substr(0, Math.floor(testProj.abstract.length/4))})
    const [foundName, nameResults] = await searchByCriteria({...query, criteria: 'name', searchTerm: testProj.name.substr(testProj.name.length/2).toUpperCase()})
    // Verify: project is matched by all 4 criteria, project is matched case insensitive by full/partial term
    expect([foundTag, foundAuthor, foundAbstract, foundName]).toEqual([true, true, true, true]);
    expect(testProj).toMatchObject(tagResults[0].data[0]);
    expect(testProj).toMatchObject(nameResults[0].data[0]);
    expect(testProj).toMatchObject(authorResults[0].data[0]);
    expect(testProj).toMatchObject(abstractResults[0].data[0]);
    });

    it('Should return the full first page of results matching a search term', () => {
    // Setup: Save multiple projects(10) with same tag    
    // Act: Request first search page for tag
    // Verify: No of results equals limit, all results contain the search term
    });

    it('Should return the last page of results matching a search term', () => {
    // Setup: Save multiple projects(18) with same tag    
    // Act: Request third search page for tag
    // Verify: No of results is equal to (total results % page limit), all results contain search term
    });

    it('Should accurately return total count of search results', () => {
    // Setup: Save multiple projects with same tag
    // Act: Request each page for tag, note total count on server
    // Verify: Count of results after all pages equals total count
    });
});