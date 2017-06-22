const path = require("path");
const config = require("./config/database");
const middleware = require("./config/middleware");
const toiletViewer = require("toilet-viewer");

// models
let Toilet = toiletViewer.model;
const app = require("./config/server");

// start DB
config.startDb();

// Load view engine
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "pug");

// middleware
app.use(middleware);

//get home
app.get("/", function(req, res){
    Toilet.find({}, function(err, toilets){
        if (err){
            console.log(err)
        }else{
            res.render("home", {toilets: toilets});
        }
    });  
});

// Route files
const routes = toiletViewer.routes;
app.use("/toilets", routes);

//start the server
