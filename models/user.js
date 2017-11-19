var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);

// // Old Main Config
// var mongoose    = require("mongoose"),
//     passportLocalMongoose = require("passport-local-mongoose");

// //User Login - authenticate the user
// var userLogSchema = new mongoose.Schema({
//    username: String,
//    password: String
// });

// //User - email and name to add data
// var userSchema = new mongoose.Schema({
//    email: String,
//    name: String,
//    posts: [{
//        type: mongoose.Schema.Types.ObjectId,
//        ref: "Post"
//    }]
// });

// //Used to be able to export the schema for User Login
// module.exports = mongoose.model("UserLogin", userLogSchema);

// //Installs all the packages you need with passport
// userLogSchema.plugin(passportLocalMongoose);

// //Used to be able to export the schema for User
// module.exports = mongoose.model("User", userSchema);