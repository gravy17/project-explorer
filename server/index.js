require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const register = require('@react-ssr/express/register');
const app = express();

( async() => {

  await register(app);

  app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
  });

  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(flash());

  app.use(session({
      secret: process.env.SESSION_SECRET || 'secret',
      cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: true
      },
      resave: true,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
      })
  }));

  app.use('/', require('./controllers/home'));
  app.use('/', require('./controllers/user'));
  app.use('/', require('./controllers/project'));
  app.use('/', require('./controllers/search'));

  //Catch-all for 404 Errors
  app.all('*', (req, res) => {
    const err = { stack: new Error().stack, message: 'Not Found', status: 404};
    throw err;
  });

  //Handler for all errors. Renders an Error page
  app.use((err, req, res, next) => {
    if(!process.env.PRODUCTION){
        res.status(err.status || 500);
        res.render('Failure', {user: req.session?.user || {}, error:err });
    } else {
        if(!err.status) { err.message = "Internal Server Error"; console.error(err);}
        res.status(err.status || 500);
        res.render('Failure', {user: req.session?.user || {}, error:{ status:err.status, message:err.message } });
    }
  });

  app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT));

  mongoose.set("bufferCommands", false);

  mongoose.connect (
      process.env.MONGODB_URI,
      {
          ssl: true,
          useNewUrlParser: true,
          useUnifiedTopology: true
      },
      (err) => {
          if (err) {
              console.error("Error connecting to db: ", err);
          } else {
              console.log(`Connected to MongoDB`);
          }
      }
  );
  mongoose.connection.on('error', err => {
      console.error(err);
  })
})()
