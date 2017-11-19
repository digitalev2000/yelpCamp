var 
express   = require("express"),
router    = express.Router,
passport  = require("passport"),
User      = require("../models/user");


// Register Route - To register users 
router.get("/register", function (req, res){
 res.render("register");
});

// Signup Route - For user signup 
router.post("/register", function (req, res){
   req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render('register');
      }
      passport.authenticate("local")(req, res, function(){
          res.redirect("/campgrounds");
      });
  });
});

// Login Route - To login users 
router.get("/login", function (req, res){
 res.render("login");
});

// Login Form Route - To process logic for logged in users 
router.post("/login", passport.authenticate("local", {
    //Middleware
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function (req, res){
});

// Login Out - To logout users 
router.get("/logout", function (req, res){
 req.logout();
 res.redirect("/");
});

// Check if a user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;