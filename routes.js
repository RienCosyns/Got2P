const express = require("express");
const router = express.Router();

// import models
t Toilet = require("toilet-viewer").model;
let Rating = require("rating-app").model;

//get home
router.get("/", function(req, res){
    Toilet.find({}, function(err, toilets){
        if (err){
            console.log(err)
        }else{
            res.render("home", {toilets: toilets});
        }
    });  
});

// get a single toilet
router.get("/toilet/:id", (req, res)=>{
    let id = req.params.id;
    Toilet.findById(id, function(err, toilet){
        if (err){
            console.log(err);
        }else{
            
            res.render("toilet", {toilet: toilet})
        }
    })
});

//delete a toilet
router.delete("/toilet/:id", function(req, res){
    let query = {_id: req.params.id}
    Toilet.remove(query, function(err){
        if (err){
            console.log(err);
            return;
        }else{
            console.log("Toilet deleted");
            res.send('Success');
        }
    })
})

module.exports = router;
