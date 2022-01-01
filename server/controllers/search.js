require('dotenv').config();
const express = require('express');
const router = express.Router();
const projectService = require('../services/project');
const PAGE_SIZE = parseInt(process.env.PAGE_SIZE);

router.get('/search', async(req, res) => {
    // expects a request query containing a search term, criteria and page. 
    // Defaults to a name search for criteria and the first page unless specified
    // Rejects a search without a term
    if(!req.query.term){
        res.status(200)
        .render('Search', {user: req.session.user });
    }
    const query = {
        searchTerm: req.query.term,
        criteria: req.query.criteria || "name",
        page: parseInt(req.query.page) || 1 ,
        page_size: PAGE_SIZE 
    };
    const [isFound, results] = await projectService.searchByCriteria(query);
    if(isFound) { //if successful, render current page
        res.status(200)
        .render('Search', {user: req.session.user, results: results, currentSearch: query });
    } else { //if unsuccessful, render search with no results
        res.status(400)
        .render('Search', {user: req.session.user, errors: results, currentSearch: query });
    } 
});

module.exports = router;
