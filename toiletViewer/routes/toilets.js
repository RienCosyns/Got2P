var express = require("express");
var router = express.Router();

var Toilet = require("../models/toiletModel")

// add a toilet
router.get("/add", function(req, res){
    res.render("add_toilet", {})
})

// Add processing
router.post("/add", function(req, res){
    req.checkBody("place", "Place is required").notEmpty();
    req.checkBody("street", "Street Name is required").notEmpty();
    req.checkBody("zipcode", "Zipcode is required").notEmpty();
    req.checkBody("city", "City is required").notEmpty();
    req.checkBody("country", "Country is required").notEmpty();

    let errors = req.validationErrors();
    console.log("***************" + errors + "****************");
    if (errors){
        res.render("add_toilet" ,{
            title: "Add Toilet",
            errors: errors
        })
    }else{
        let newToilet = new Toilet();
        newToilet.place = req.body.place;
        newToilet.address.street = req.body.street;
        newToilet.address.number = req.body.number;
        newToilet.address.zipcode = req.body.zipcode;
        newToilet.address.city = req.body.city;
        newToilet.address.country = req.body.country;

        newToilet.save((err) => {
            console.log("------------------------")
            if (err){
                console.log(err);
                return;
            }else{
                req.flash("success", "Toilet added");
                console.log("Toilet added");
                res.redirect("/");
            }
        })
    }   
});


// get to edit
router.get("/edit/:id", function(req, res){
    Toilet.findById(req.params.id, function(err, toilet){
        if (err) {
            console.log(err)
        }else{
            res.render("edit_toilet", {toilet: toilet});
        }
    })
})

// edit processing
router.post("/edit/:id", function(req, res){
    let toilet = {};
    
    toilet.place = req.body.place;
    toilet.address = {};
    toilet.address.street = req.body.street;
    toilet.address.number = req.body.number;
    toilet.address.zipcode = req.body.zipcode;
    toilet.address.city = req.body.city;
    toilet.address.country = req.body.country;
    
    let query = {_id: req.params.id}

    Toilet.update(query, toilet, function(err){
        if (err){
            console.log(err);
            return;
        }else{
            req.flash("success", "Toilet updated");
            console.log("Toilet updated");
            res.redirect("/toilet/" + req.params.id)
        }
    })
});

module.exports = router;