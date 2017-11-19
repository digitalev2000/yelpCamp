var mongoose = require("mongoose");
//Database name
mongoose.connect("mongodb://localhost/yelp_app");

// DB Pattern of paremeters
var yelpSchema  = new mongoose.Schema({
   name:  String,
   location: String,
   date: Number
});

//The model with all the methods that you want on it and makes a collection for you
var Yelper = mongoose.model("Yelper", yelpSchema);

// //Add a location to the db
// var niagraFalls = new Yelper({
//     name: "Niagra Falls",
//     date: 1904,
//     lacation: "Wyoming"
// });

// niagraFalls.save(function (err, yelper){
//     if(err){
//         console.log("Something went wrong!");
//     }else{
//          console.log("Yelper saved to DB!");
//          console.log(yelper);
//     }
// });

//Retrieve all locations from the DB 
Yelper.find({}, function(err, yelper){
    if(err){
        console.log("Oh No. Error!");
        console.log(err);
    } else {
        console.log("<<<<<<<< All of the locations >>>>>>>>")
        console.log(yelper);
    }
});

//Add a location to the DB 
Yelper.create({
    name: "Forest Perserve",
    location: "Chicago",
    date: 1860
}, function(err, yelper){
    if(err){
        console.log(err);
    } else {
        console.log(yelper);
    }
});


//App fixes
mongoose.Promise = global.Promise; 
mongoose.connect("mongodb://localhost/yelp_app", {useMongoClient: true});