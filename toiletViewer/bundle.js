// require stuff
const Toilet = require("./models/toiletModel");
const routes = require("./routes/toilets");

// export 
module.exports = {
    model: Toilet,
    routes: routes
}
