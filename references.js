// Main Config
var mongoose    = require("mongoose");
mongoose.connect("mongodb://localhost/blogdemo_2"); 

// Included js files - Notice the ./ to reference location
var Post = require("./models/post");
var User = require("./models/user");

// User.findOne({email: "jandoe@gmail.com"}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user)
//     }
// });

Post.create({
  title: "Just a thought.",
  content: "I wonder if they really know me?"
}, function(err, post){
    User.findOne({email: "jandoe@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function (err, data){
               if(err){
                console.log(err);   
               } else {
                   console.log(data);
               }
            });
        }
        
    });
});