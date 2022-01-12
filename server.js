require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const next = require('next');

const dev = process.env.PRODUCTION !== 'true';
const app = next({ dev });

app.prepare().then(() => {
    const server = express()

    server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    
    server.use(morgan('combined'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(flash());
    
    try{
    server.use(session({
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
    } catch (err) {
        server.use(session({
            secret: process.env.SESSION_SECRET || 'secret',
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: true
            },
            resave: true,
            saveUninitialized: false
        }));
    }

    server.set('views', __dirname + '/views');
    server.set('view engine', 'jsx');
    server.engine('jsx', require('express-react-views').createEngine());
        
    server.use('/', require('./controllers/home'));
    server.use('/', require('./controllers/user'));
    server.use('/', require('./controllers/project'));
    server.use('/', require('./controllers/search'));
    
    //Catch-all for 404 Errors
    server.all('*', (req, res) => {
    const err = { stack: new Error().stack, message: 'Not Found', status: 404};
    throw err;
    });
    
    //Handler for all errors. Renders an Error page
    server.use((err, req, res, next) => {
    if(!process.env.PRODUCTION){
        res.status(err.status || 500);
        res.render('Failure', {user: req.session?.user || {}, error:err });
    } else {
        if(!err.status) { err.message = "Internal Server Error"; console.error(err);}
        res.status(err.status || 500);
        res.render('Failure', {user: req.session?.user || {}, error:{ status:err.status, message:err.message } });
    }
    });
    
    server.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT));
    
    try {
        mongoose.set("bufferCommands", false);
        mongoose.connect (
        process.env.MONGODB_URI,
        {
            ssl: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`Connected to MongoDB`);
        });
        mongoose.connection.on('error', err => {
            console.error(err);
        })
    } 
    catch (err) {
        console.error("Failed to connect to DB: "+ err)        
    }
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })