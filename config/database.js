const mongoose = require("mongoose");

module.exports = {
    database: 'mongodb://localhost:27017/toiletApp',
    secret: 'yoursecret',

    startDb: function(){
        // mongodb connection
        mongoose.Promise = require("bluebird");
        mongoose.connect(this.database);
        let db = mongoose.connection;

        // Check db connection
        db.once("open", () =>{
            console.log("Connected to Mongo DB");
        })

        // Check for db errors
        db.on("error", (error) => {
            console.log(error);
        });
    }
}