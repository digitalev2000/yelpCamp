// Main Config
var mongoose    = require("mongoose");

//Post -  title and content
var commentSchema = new mongoose.Schema({
   text: String,
   author: {
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref:  "User"
      },
      username: String,
   }
});

//Without the code below you cannot use this file elsewhere!
module.exports = mongoose.model("Comment", commentSchema);