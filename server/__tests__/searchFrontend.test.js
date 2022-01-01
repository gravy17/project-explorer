/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act, render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import Search from '../../views/Search';
import fakeSearchResults from '../utils/fakeSearchResults';

let fakeResults;

beforeAll(async() => {

});

afterAll(async() => {

});

let container;
// Tests to ensure the view accurately reflects the results and paging states
// of a search and performs searches using tags and inline forms in the header
describe('Search Functionality in the Views', () => {
    
    beforeEach(async() => {
        // setup
        container = document.createElement('div');
        document.body.appendChild(container);
    })
    
    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });
    
    it('Should render search form and results', () => {
        fakeResults = fakeSearchResults.page1;
        act(() => {
            render(<Search results={fakeResults} currentSearch={{ page: 1, page_size: 8, criteria: 'tags', searchTerm: 'fake'}} />, container);
        })
        let forms = Array.from(document.getElementsByTagName('form'));
        let criteriaSelect = document.getElementsByTagName('select')[0];
        let searchCriteriaForm = document.getElementById('searchForm');
        let resultCards = Array.from(document.getElementsByClassName('project-info'));
        let titles = Array.from(document.getElementsByClassName('card-title'));
        titles = titles.map(title => title.innerHTML);
        let expectedTitles = fakeResults[0]['data'].map(res => res['name']); 

        expect(forms.length).toBe(2);
        expect(searchCriteriaForm.contains(criteriaSelect)).toBe(true);
        expect(criteriaSelect.value).toEqual('tags');
        expect(resultCards.length).toBe(8);
        expect(titles).toMatchObject(expectedTitles);
    });

    it('Should show a link to next page only where results exceed 1 page', () => {
    // Act: Load a search for projects by that tag, next through it
    // Verify: Next link containing query for (current page + 1) in the DOM
    // Not in the last page
    });

    it('Should show a link to previous page only when on a page greater than 1', () => {
    // Setup: Add multiple projects(18) with same tag
    // Act: Load a search for projects by that tag to last page, prev through it
    // Verify: Previous link containing query for (current page - 1) in the DOM
    // Not in the dom when on first page
    });
    
    it('Should perform a name search with the search form in the header', () => {
    // Setup: Find search form in header
    // Act: Fill it with a search term
    // Verify: a search request was made with the name criteria and search term
    });

    it('Should perform a tag search with the tag on a project card', () => {
    // Setup: Go to homepage, find a tag
    // Act: Trigger the tag and check its value
    // Verify: a search request was made with the tag criteria and value of the tag
    })
});