// ----- Main Config
var mongoose    = require("mongoose");

//------ Mongoose/Model Config
var campgroundSchema  = new mongoose.Schema({
   name:  String,
   image: String,
   price: String,
   description: String,
    author: {
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref:  "User"
      },
      username: String,
   },
   created: {type: Date, default: Date.now}, 
   comments: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
       }
       ]
});

//The model with all the methods that you want on it and makes a collection for you
module.exports = mongoose.model("Campground", campgroundSchema);