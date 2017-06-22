let mongoose = require("mongoose");

// Toilet schema
let toiletSchema = mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    address: {
        street : {
            type: String,
            required: true
        },
        number: {
            type: String
        },
        zipcode: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    createdAt :{
        type : Date,
        default: Date.now
    }
});

let Toilet = module.exports = mongoose.model("Toilet", toiletSchema);