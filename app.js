const path = require("path");
const db = require("./config/database");
const middleware = require("./config/middleware");
const toiletViewer = require("toilet-viewer");
const fileUploader = require("file-uploader");
const ratingApp = require("rating-app");
const main = require("./routes");
// // models
// let Toilet = toiletViewer.model;
// let Rating = ratingApp.model;
const app = require("./config/server");

// start DB
db.startDb();

// Load view engine
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "pug");

// middleware
app.use(middleware);

// Route files
const toilets = toiletViewer.routes;
app.use("/toilets", toilets);
const uploads = fileUploader.routes;
app.use("/fileupload", uploads);
const ratings = ratingApp.routes;
app.use("/toilets/rate", ratings);
app.use(main);
//start the server
