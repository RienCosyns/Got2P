const path = require("path");
const config = require("./config/database");
const middleware = require("./config/middleware");
const toiletViewer = require("toilet-viewer");
const fileUploader = require("file-uploader");
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
const toilets = toiletViewer.routes;
app.use("/toilets", toilets);
const uploads = fileUploader.routes;
app.use("/fileupload", uploads);
//start the server
