const express = require("express");
const router = express.Router();
const path = require("path");

let Rating = require("../models/ratingModel")

router.get("/allratings", function(req, res){
    console.log("**************GET*************")
    Rating.find(function(err, ratings){
        if (err){
            throw err;
        }else{
            res.json(ratings);
        }
    })
})

router.get("/:id", function(req, res){
    res.render("ratings", {id: req.params.id})
})

router.post("/:id", function(req, res){
    console.log("**************POST************")
    // console.log(req.body);
    console.log(req.headers);
    let newRating = new Rating();

    newRating.toilet_id = req.params.id;
    newRating.hygiene = req.body.hygiene;
    newRating.toiletBowl = req.body.toiletfac;
    newRating.handWashing =  req.body.handwashing;
    newRating.comments = req.body.comments;
    newRating.ratedBy = req.body.ratedBy || "Anonymous";
    
    console.log("rating: " + newRating);
    console.log(typeof newRating.hygiene)
    var error = newRating.validateSync();
    console.log(("Error:" + error));
    newRating.save(function(err, rating){
        if (err){
            console.log("OOPS " + err);
        }
        req.flash("success", "Rating added");
        res.redirect("/toilet/" + req.params.id);
        console.log("Rating saved: " + rating); 
    })

    // Rating.create(newRating, function(err, rating){
    //     if (err){
    //         console.log(err)
    //     }else{
    //         console.log(rating);
    //         req.flash("success", "Rating added");
    //         res.redirect("/toilets/" + req.params.id);
    //     }
    // })
})



module.exports = router;