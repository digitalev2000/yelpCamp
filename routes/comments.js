var 
express     = require("express"),
router      = express.Router,
Campground  = require("../models/campground"), 
Comment     = require("../models/comment");


//New Comment Route - used to add a comment
router.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

router.post("/campgrounds/:id/comments", isLoggedIn, function (req, res){
      //look up camp by using the id
        Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    //create the new comment
                  // campground.comments.push(comment);
                   //connect new comment to the campground
                   campground.save();
                   //redirect to show page
                   res.redirect('/campgrounds/' + campground._id)
                }
            });
        }
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