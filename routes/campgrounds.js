var 
express = require("express"),
router  = express.Router,
Campground  = require("../models/campground"), 
Comment     = require("../models/comment");

//Index Route - "/" home route & Login page 
router.get("/", function (req, res){
  res.render("home");
});

//Main Route - To show all campgrounds
router.get("/campgrounds", function(req, res){
    //Get all campgrounds from the db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
           res.render("campgrounds/index", {campgrounds:allcampgrounds});  
        }
    });
  });

//Create Route - used to add a new campground
router.post("/campgrounds", isLoggedIn, function (req, res){
  // get data from the form and add it to an array
  var name  = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  //Create a new camp and save to the db - 
  //To remove items type 
  //use [database];
  // db.dropDatabase();
  //Remove by ID by typing something like -  db.campgrounds.remove({_id: ObjectId("59c06af97e0b462722500173")})
  console.log(req.body);
  req.body.description = req.sanitize(req.body.description);
  console.log(",,,,,,,,,,,,,,,,");
  console.log(req.body);
  Campground.create(newCampground, function(err, newlyCreated){
      if(err){
        alert(err);  
      }else{
        //redirect back to the campground page
        res.redirect("/campgrounds");
      }
  });
});

//New Route - used to show form and create a campground
router.get("/campgrounds/new", isLoggedIn, function (req, res){
  res.render("campgrounds/new");
});

//Show Route - used to show specific info about a campground and Has to be after the new route abpve
router.get("/campgrounds/:id", function (req, res){
  //Find the campground with provide id and show its template contents
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
          console.log(err);
      } else {
          console.log(foundCampground);
        res.render("campgrounds/show", {campground: foundCampground});
      }
  });
  req.params.id;
  
});

//Edit Route - used to show form and create a campground
router.get("/campgrounds/:id/edit", isLoggedIn, function (req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
          res.redirect("/campgrounds");
      }else{
          res.render("edit", {campground: foundCampground});
      }
  })
});

//Update Route - used to update a specific item
router.put("/campgrounds/:id", isLoggedIn, function (req, res){
    req.body.description = req.sanitize(req.body.description);
  Campground.findByIdAndUpdate(req.params.id, req.body.campgrounds, function(err, updatedCampground){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
  });
});

//Delete Route - used to delete a specific item
router.delete("/campgrounds/:id", isLoggedIn, function (req, res){
 //Destroy item
 Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
 //Redirect somewhere
});
 });
 
 // Check if a user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}
 module.exports = router;