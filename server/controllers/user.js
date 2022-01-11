const express = require('express');

const router = express.Router();

const { getPrograms, getGradYears } = require('../services/school');
const {create, authenticate } = require('../services/user');

router.get('/signup', (req, res) => {
  const programs = getPrograms();
  const graduationYears = getGradYears();

  const errorMsg = req.flash('error');
  let formData, errors;
  if(errorMsg.length){
    [errors, formData] = JSON.parse(errorMsg);
  }

  res.status(200)
  .render('Signup', {user: req.session.user, programs, graduationYears, errors, formData});
});

router.post('/signup', async(req, res) => {
  const newUser = { 
    firstname: req.body.firstName, 
    lastname: req.body.lastName, 
    email: req.body.email, 
    password: req.body.password, 
    program: req.body.program, 
    matricNumber: req.body.matricNumber, 
    graduationYear: req.body.graduationYear };
  const [isCreated, result] = await create(newUser);

  if(isCreated){
    req.session.user = result;
    res.status(200)
    .redirect('/');
  } else {
    req.flash('error', JSON.stringify([result, newUser]));
    res.status(400)
    .redirect('/signup');
  }
});

router.get('/login', (req, res) => {
  const errorMsg = req.flash('error');
  let errors;
  if(errorMsg.length){
    errors = JSON.parse(errorMsg);
  }
  res.status(200)
  .render('Login', {user: req.session.user, errors});
});

router.post('/login', async(req, res) => {
  const {email, password} = req.body;
  const [isAuthenticated, result] = await authenticate(email, password);

  if(isAuthenticated){
    req.session.user = result;
    res.status(200)
    .redirect('/');
  } else {
    req.flash('error', JSON.stringify(result));
    res.status(400)
    .redirect('/login');
  }
});

module.exports = router;
