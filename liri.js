require("dotenv").config();

//Code required to import the keys.js file
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//Grab the argument
var command = process.argv[2];
//Join the remaining arguments 
var searchTerm = process.argv.slice(3).join(" ");

//Liri.js can take in one of the following commands:
switch (command) {
    case "concert-this":
        concertThis (searchTerm);
        break;

    case "spotify-this-song":
        spotifyThisSong (searchTerm);
        break;

    case "movie-this":
        movieThis (searchTerm);
        break;

    case "do-what-it-says":
        doWhatItSays (searchTerm);
        break;
}

function concertThis (search){
    axios.get ("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
    .then(function (res){
        console.log("\nVenue: " + res.data[0].venue.name + "\nLocation: " + res.data[0].venue.city + "\nDate: " + moment(res.data[0].datetime).format("MM/DD/YYYY") + "\n\n");
    }).catch(function (err){
        if (err) throw err;
    });
}

function spotifyThisSong (search) {
    if (!search) {
        search="The Sign - Ace of Base"
    }
    spotify.search ({ type: "track", query: search}, function(err, data){
        if (err) throw err;
        var song = data.tracks.items[0];
        console.log("\nArtist(s): " + song.artists[0].name + "\nSong: " + song.name + "\nPreview: " + song.preview_url + "\nAlbum: " + song.album.name + "\n\n");
    })
}

function movieThis (search){
    if (!search) {
        search="Mr. Nobody"
    }
    axios.get ("http://www.omdbapi.com/?apikey=3cb42b54&s=" + search)
    .then (function (res){
        var title = res.data.Search[0].Title;
        // console.log("\nTitle: " + res.data.Search[0].Title + "\nYear Released: " + res.data.Search[0].Year + "\nIMDB Rating: ");
        axios.get ("http://www.omdbapi.com/?apikey=3cb42b54&t=" + title)
        .then (function (res){
            console.log("\nTitle: " + res.data.Title + "\nReleased: " + res.data.Year + "\nIMDBRating: " + res.data.imdbRating + "\nRottenTomatoes: " + res.data.Ratings[1].Value + "\nCountry: " + res.data.Country + "\nLanguage(s): " + res.data.Language + "\nPlot: " + res.data.Plot + "\nActors: " + res.data.Actors + "\n\n");
        })
    }).catch(function (err){
        if (err) {
            console.log(err);
        }
    })
}

function doWhatItSays (search) {
    var theCommand;
    var searchTerm;
    fs.readFile ("random.txt", "UTF-8", (err, data) => {
        if (err) throw err;
        theCommand = data.split(",")[0];
        searchTerm = data.split(",")[1].replace(/"/g,"");
        switch (theCommand) {
            case "concert-this":
                concertThis (searchTerm);
                break;
        
            case "spotify-this-song":
                spotifyThisSong (searchTerm);
                break;
        
            case "movie-this":
                movieThis (searchTerm);
                break;
        
            case "do-what-it-says":
                doWhatItSays (searchTerm);
                break;
        }
    })
}