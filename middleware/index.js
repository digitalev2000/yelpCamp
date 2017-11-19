//Add the main Schemas to below aurguments
var Campground =  require("../models/campground");
var Comment =  require("../models/comment");

// Pull all of the middleware we need into an array
var middlewareObj = {};

//Check Campground Ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //Make sure we have the right user first
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err || !foundCampground){
          req.flash("error", "That campground was not found!");
          res.redirect("back");
      }else{
       //Does the user own the campground?
       if(foundCampground.author.id.equals(req.user._id)){
          next();
       } else {
           req.flash("error", "You don't have premission to do that!");
           res.redirect("back");
       }
      }
  });  
  } else {
      req.flash("error", "You have to be logged in to do that!");
      res.redirect("back");
  }
}

//Check Comment Ownership
middlewareObj.checkCommentOwnership = function (req, res, next){
    //Make sure we have the right user first
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
     if(err || !foundComment){
          req.flash("error", "That comment was not found!");
          res.redirect("back");
      }else{
       //Does the user own this comment?
       if(foundComment.author.id.equals(req.user._id)){
          next();
       } else {
           req.flash("error", "You don't have permissions to do that!");
           res.redirect("back");
       }
      }
  });  
  } else {
      req.flash("error", "You gotta be logged in to do that!");
      res.redirect("back");
  }
}

//Check if a user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You gotta be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;