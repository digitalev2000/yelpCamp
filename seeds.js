 var
    Campground  = require("./models/campground"), 
    Comment  = require("./models/comment"), 
    mongoose    = require("mongoose");
    
var data = [
    {
        name:"Snakes Bluff",
        image: "https://farm5.staticflickr.com/4137/4851863145_ef054b44b3.jpg",
        description:"Praesent nec malesuada magna, ac vulputate ex. Maecenas sit amet urna ut nunc feugiat interdum iaculis eu est. Morbi varius tellus nec bibendum dapibus. Nullam aliquam molestie nisi, ut tristique lacus pharetra eget. Donec pulvinar placerat erat, sollicitudin tempor magna ultricies vel. Donec vehicula imperdiet pretium. Nunc nunc augue, pretium fringilla nibh congue, dignissim dictum mauris. Quisque nec malesuada elit. "
    },
    {
        name:"Snow Creek",
        image: "https://farm4.staticflickr.com/3564/3692450629_6418b3049e.jpg",
        description:"Praesent nec malesuada magna, ac vulputate ex. Maecenas sit amet urna ut nunc feugiat interdum iaculis eu est. Morbi varius tellus nec bibendum dapibus. Nullam aliquam molestie nisi, ut tristique lacus pharetra eget. Donec pulvinar placerat erat, sollicitudin tempor magna ultricies vel. Donec vehicula imperdiet pretium. Nunc nunc augue, pretium fringilla nibh congue, dignissim dictum mauris. Quisque nec malesuada elit. "
    },
    {
        name:"Forest Park",
        image: "https://farm8.staticflickr.com/7488/15684695768_e9a7dfa2b0.jpg",
        description:"Praesent nec malesuada magna, ac vulputate ex. Maecenas sit amet urna ut nunc feugiat interdum iaculis eu est. Morbi varius tellus nec bibendum dapibus. Nullam aliquam molestie nisi, ut tristique lacus pharetra eget. Donec pulvinar placerat erat, sollicitudin tempor magna ultricies vel. Donec vehicula imperdiet pretium. Nunc nunc augue, pretium fringilla nibh congue, dignissim dictum mauris. Quisque nec malesuada elit. "
    }
    ];
    
function seedDB(){    
//Remove all campgrounds
Campground.remove({}, function(err){
//     if(err){
//         console.log(err)
//     }
//   console.log("You removed the campgrounds dude!");
//   // Add a few campgrounds
//     data.forEach(function(seed){
//       Campground.create(seed, function (err, campground){
//           if(err){
//               console.log(err);
//           } else {
//               console.log("You added a campground!");
//               // Add some comments
//               Comment.create(
//                   {
//                   text: "This place is awesome, but no Wifi :(",
//                   author: "Richard Berry"
//                   }, function(err, comment){
//                       if(err){
//                           console.log(err);
//                       } else {
//                             campground.comments.push(comment);  
//                             campground.save();
//                             console.log("You created a new comment!")
//                       }
//                   });
//                 }
//       });
//     });
    });
}

module.exports = seedDB;