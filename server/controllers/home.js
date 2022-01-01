const express = require('express');

const router = express.Router();

const projectService = require('../services/project');

router.get('/', async(req, res) => {
  const projects = await projectService.getAll();
  const projectShowcase = projects?.slice(0,4);
  res.status(200)
  .render('Home', {projects: projectShowcase, user: req.session.user });
});

router.get('/logout', async(req, res) => {
  req.session.destroy();
  res.status(200).redirect('/')
});

module.exports = router;
