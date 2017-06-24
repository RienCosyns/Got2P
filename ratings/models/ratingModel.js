var mongoose = require("mongoose");

var ratingSchema = mongoose.Schema({
    hygiene : {
        type: Number,
        required: true
    },
    toiletBowl : {
        type: Number,
        required: true
    },
    handWashing: {
        type: Number,
        required: true
    },
    ratedBy: {
        type: String,
    },
    ratedAt: {
        type: Date,
        default: Date.now
    },
    toilet_id: {
        type: String,
        required: true
    },
    comments: {
        type: String
    }
})


var Rating = module.exports = mongoose.model("Rating", ratingSchema, "ratings");

module.exports.getAverageRating = function(toilet_id, cb){
    let query = {toilet_id: toilet_id};
    let avg = 0;
    let nbOfRatings = 3;
    let hygiene = 0;
    let handWashing = 0;
    let toiletBowl = 0;
    Rating.find(query, function cb(err, ratings){
        if (err){
            throw err
        }else{
            for (var i = 0; i < ratings.length; i++){
                hygiene += ratings[i].hygiene;
                handWashing += ratings[i].handWashing;
                toiletBowl += ratings[i].toiletBowl;
                
            }
            avg = (hygiene + handWashing + toiletBowl) / (nbOfRatings * ratings.length) 
        }
    })
    return avg;
}