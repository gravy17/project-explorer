const express = require('express');

const router = express.Router();

const { create, getById } = require('../services/project');
const { trackView, getViewHistory } = require('../services/user');

router.get('/projects/submit', (req, res) => {
  if(req.session.user){
    const errorMsg = req.flash('error');
    let errors;
    if(errorMsg.length){
      errors = JSON.parse(errorMsg);
    }
    res.status(200)
    .render('CreateProject', {user: req.session.user, errors});
  } else {
    res.status(401)
    .redirect('/login');
  }
});

router.post('/projects/submit', async(req, res) => {
  let authors, tags;
  if(req.body.tags.length){
	tags = req.body.tags.split('#')
	.map(tag => tag.trim()).filter(word => word.length);}
  if(req.body.authors.length){
	authors = req.body.authors.split(',')
	.map(name => name.trim()).filter(word => word.length);}
	
  const newProject = {...req.body, createdBy: req.session.user._id, authors, tags};
 
  const [isCreated, result] = await create(newProject);
  if(isCreated){
    res.status(200)
    .redirect('/project/'+result._id);
  } else {
    req.flash('error', JSON.stringify(result));
    res.status(400)
    .redirect('/projects/submit');
  }
});

router.get('/project/:id', async(req, res) => {
  const projectData = await getById(req.params.id);
  const creator = projectData.createdBy;
  const creatorName = creator.firstname + ' ' + creator.lastname;
  if(req.session.user) {
    // If there is a logged in user, records first or subsequent visits
    const project_view = {project_id: projectData._id, last_view: new Date()};
    if(await trackView(req.session.user._id, project_view)){
      //get subdocument with updated project views
      //and attach to user session
      const trackedData = await getViewHistory(req.session.user._id);
      req.session.user['project_views'] = trackedData.project_views;
    }
  }
  res.status(200).render('Project', {user: req.session.user, project: projectData, creatorName});
});

module.exports = router;
