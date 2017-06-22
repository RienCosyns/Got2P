// ***********************************
// middleware
// ***********************************
const express = require("express");
const middleware = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");


middleware.use(bodyParser.json());
middleware.use(bodyParser.urlencoded({extended: false}));

// Set public folder
middleware.use(express.static(path.join(__dirname, "../public")));

// Express session middleware
middleware.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express messages middleware

middleware.use(require("connect-flash")());
middleware.use(function(req, res, next){
    res.locals.messages = require("express-messages")(req, res);
    next();
});

module.exports = middleware;