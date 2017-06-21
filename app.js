// require every local module and config
const express = require("express");
const app = express();
const port = 3000;

const config = require("./config/database");
const toiletViewer = require("./toiletViewer/index");

//start the server
app.listen(port, function(){
    console.log("Server started on server " + port);
})