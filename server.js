// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());

//secret: process.env.SESSION_SECRET,

app.use(session({
    secret: 'cs5610',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));

// CORS
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Origin", "https://cs5610-webdev-hm-project.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const port = process.env.PORT || '3100';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);
require("./assignment/app.js")(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen(port, function () {
    console.log('Node app is running on port', app.get('port'))
});
