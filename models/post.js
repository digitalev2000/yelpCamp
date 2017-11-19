// Main Config
var mongoose    = require("mongoose");

//Post -  title and content
var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

//Without the code below you cannot use this file elsewhere!
module.exports = mongoose.model("Post", postSchema);