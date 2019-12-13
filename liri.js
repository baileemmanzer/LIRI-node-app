require("dotenv").config();

//Code required to import the keys.js file
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

//Grab the argument
var commands = process.argv[2];
//Join the remaining arguments 
var results = process.argv.slice(3).join(" ");

//Liri.js can take in one of the following commands:
switch (commands) {
    case "concert-this":
        concertThis (results);
        break;

    case "spotify-this-song":
        spotifyThisSong (results);
        break;

    case "movie-this":
        movieThis (results);
        break;

    case "do-what-it-says":
        doWhatItSays (results);
        break;
}

function concertThis (){
    
}