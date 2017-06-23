var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var Toilet = require("toilet-viewer").model;
// router.use(express.static(path.join(__dirname, '../public')));

router.get('/:id', function(req, res){
  res.render("upload", {id: req.params.id});
});

router.post('/:id', function(req, res){
    console.log("***********POST*************")
  // create an incoming form object
  var form = new formidable.IncomingForm();
  // specify that we want to allow the user to upload multiple files in a single request
//   form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../public/user_uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, req.params.id + ".png"));
  });

  // store the path as a property in the toilet object
  let query = {_id: req.params.id};
  let update = {
      imagePath: "/user_uploads/" + req.params.id + ".png"
  }
  Toilet.findByIdAndUpdate(query,update, {new: true}, (err, toilet) => {
      if (err) {
          throw err
      }else{
          console.log(toilet);
      }
  })

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.send("success");
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

module.exports = router;