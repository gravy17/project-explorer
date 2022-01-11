const express = require('express');

const router = express.Router();

const { getShowcase } = require('../services/project');

router.get('/', async(req, res) => {
  const projects = await getShowcase();
  res.status(200)
  .render('Home', {projects: projects, user: req.session.user });
});

router.get('/logout', async(req, res) => {
  req.session.destroy();
  res.status(200).redirect('/')
});

module.exports = router;
