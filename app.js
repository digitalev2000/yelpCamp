//------------------------------
// App Config                  |
//------------------------------
var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    methodOverride        = require("method-override"),
    Campground            = require("./models/campground"), 
    Comment               = require("./models/comment"),
    expressSanitizer      = require("express-sanitizer"),
    seedDB                = require("./seeds"),
    flash                 = require("connect-flash"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    User             = require("./models/user"),
    passportLocalMongoose = require("passport-local-mongoose"),
    mongoose              = require("mongoose");

//----------------------------------
// Mongoose Congfig                |
//----------------------------------

// Note: If there is an error > cd into ~ data or the main .. cd directory and type rm /data/db/mongod.lock then type mongod --bind_ip=$IP --nojournal > 
// open a new term & cd into cwredesign:~/workspace and type mongo & open shell
// Always close the connection using crl+c in the window where ./mongod is running then crl+c in the window where mongo is running
// mongoose.connect("mongodb://localhost/yelp_app");  
mongoose.connect("mongodb://cwr_mongolab:Reflect212!@ds113826.mlab.com:13826/yelp_app");

//----------------------------
// App includes for packeges |
//----------------------------

//Used make the view engine express native to the app
app.set("view engine", "ejs");
//EJS directory to serve css, js and other asset directories
app.use(express.static("views"));
//Parses the body of a post request
app.use(bodyParser.urlencoded({extended: true}));
//Make sure HTML can not be used maliciously 
app.use(expressSanitizer());
//Override post request
app.use(methodOverride("_method"));
//Use public directory 
app.use(express.static("public"));

//----------------------------------
// Middleware                      |
//----------------------------------

var middleware = require("./middleware")

//----------------------------------
// User Login Code                 |
//----------------------------------

//Used to show messages when there's an error
app.use(flash());

//For the use of the login capabilities - needed to use passport
app.use(require("express-session")({
   secret: "What is the Earth's weight?",
   resave: false,
   saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
//Call the user's info here
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
//Check for login error
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
//Move to the next function after middleware call
    next();
});
//Making sure to use the "UserLogin" schema name from the user.js page
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB(); - Used to clear the database
 
 
//----------------------------------
//Restful Routes                   |
//----------------------------------

//Index Route - To direct to the campgrounds "/" home route & Login page 
app.get("/", function (req, res){
  res.render("home");
});

// Register Route - To register users 
app.get("/register", function (req, res){
 res.render("register");
});

// Signup Route - For user signup 
app.post("/register", function (req, res){
  req.body.username;
  req.body.password;
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err || user.username == 1){
          req.flash("error", err.message);
          return res.render('register');
      }
      passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to Yelpcamp " + user.username);
          res.redirect("/campgrounds");
      });
  });
});

// Login Route - To login users 
app.get("/login", function (req, res){
 res.render("login");
});

// Login Form Route - To process logic for logged in users 
app.post("/login", passport.authenticate("local", {
    //Middleware
    successRedirect: "/campgrounds",
    successFlash: "Welcome back!",
    failureRedirect: "/login",
    failureFlash: "Invalid username or password."
    }), function (req, res){
});

// Login Out - To logout users 
app.get("/logout", function (req, res){
 req.logout();
 req.flash("success", "We just logged you out");
 res.redirect("/");
});

//Main Route - To show all campgrounds
app.get("/campgrounds", function(req, res){
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
app.post("/campgrounds", middleware.isLoggedIn, function (req, res){
  // get data from the form and add it to an array
  var name  = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username:req.user.username
  }
  var newCampground = {name: name, image: image, price: price, description: desc, author: author};
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
app.get("/campgrounds/new", middleware.isLoggedIn, function (req, res){
  res.render("campgrounds/new");
});

//Show Route - used to show specific info about a campground and Has to be after the new route abpve
app.get("/campgrounds/:id", function (req, res){
  //Find the campground with provide id and show its template contents
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err || !foundCampground){
          req.flash("error", "That campground was not found!");
          res.redirect("back");
      } else {
          console.log(foundCampground);
        res.render("campgrounds/show", {campground: foundCampground});
      }
  });
  req.params.id;
  
});

//Edit Route - used to show form and create a campground
app.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function (req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
          res.render("edit", {campground: foundCampground}); 
    }); 
});

//Update Route - used to update a specific item
app.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req, res){
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
app.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req, res){
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
 
//New Comment Route - used to add a comment
app.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function (req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//New Comment Post Route - used to add a comment
app.post("/campgrounds/:id/comments", middleware.isLoggedIn, function (req, res){
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
                    //Add username and id to a comment
                    comment.author.id = req.user._id;
                    comment.author.username =  req.user.username;
                    //save comment
                    comment.save();
                    //create the new comment
                   campground.comments.push(comment);
                   //connect new comment to the campground
                   campground.save();
                   console.log(comment);
                   req.flash("success", "The new comment was added!"); 
                   //redirect to show page
                   res.redirect('/campgrounds/' + campground._id)
                }
            });
        }
   });
    
});

//Edit Comment Route - used to edit a comment
app.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function (req, res){
     Campground.findById(req.params.id, function(err, foundCampground){
         if(err || !foundCampground){
             req.flash("error", "No campground found!");
             return res.redirect("back");
         }
          Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
          res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
  });
     });
});

//Update Comment Route - used to edit a comment
app.put("/campgrounds/:id/comments/:comment_id/", middleware.checkCommentOwnership, function (req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
  });
});

//Comment Delete Route - used to delete a specific comment
app.delete("/campgrounds/:id/comments/:comment_id/", middleware.checkCommentOwnership, function (req, res){
 //Destroy item
 Comment.findByIdAndRemove(req.params.comment_id, function(err){
     if(err){
         res.redirect("back");
     } else {
         req.flash("success", "The comment was successfully deleted!");
         res.redirect("/campgrounds/" + req.params.id)
     }
 });
});


//----------------------------------
// Dynmically connect to a server  |
//----------------------------------

app.listen(process.env.PORT, process.env.IP, function(){
console.log("The server has been started on port");
});