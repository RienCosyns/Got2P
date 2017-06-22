// ***********************************
// middleware
// ***********************************
const express = require("express");
const middleware = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const expressValidator = require("express-validator");
const flash = require("connect-flash");

middleware.use(bodyParser.json());
middleware.use(bodyParser.urlencoded({extended: false}));

// Express validator middleware
middleware.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split("."),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

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