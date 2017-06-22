// ***********************************
// middleware
// ***********************************
const express = require("express");
const middleware = express();
const bodyParser = require("body-parser");
const path = require("path");

middleware.use(bodyParser.json());
middleware.use(bodyParser.urlencoded({extended: false}));

// Set public folder
middleware.use(express.static(path.join(__dirname, "../public")));

module.exports = middleware;