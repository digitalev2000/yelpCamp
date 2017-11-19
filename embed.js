// ----- New User Config
var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_app");  

//Post -  title and content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

var Post = mongoose.model("Post", postSchema);

//User - email and name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

//Add generic content -->
// var newUser = new User({
//   email: "charleysmith@gmail.com",
//   name: "Charley Marshall"
// });

// newUser.posts.push({ 
//     title: "Do you like to code?",
//     content:"Yes, it's like painting a picture with words!"
// });

// newUser.save(function (err, user){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// });

// var newPost = new Post({
//   title: "This is an awesome post!",
//   content: "Skying in Aspen"
// });

// newPost.save(function (err, post){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(post)
//     }
// });