const keys = require('./keys.js');

var arg2 = process.argv[2]
var arg3 = process.argv[3];
var fs = require("fs");


fs.appendFile("write.txt", (arg2 + " " + arg3), function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Content Added!");
  }
});


var myTweets = function(){
  var Twitter = require('twitter')
  var client = new Twitter(keys.twitterKeys)
  var params = {screen_name: 'jojopowers1234'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i < 20; i++){
        if(tweets[i] != null){
          console.log(tweets[i].text);
          console.log(tweets[i].created_at);
        }
      }
    }
    else{
      console.log(error);
    }
  });
}

var spotifyQuery = function(){
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotifyKeys);


  spotify.search({ type: 'track', query: arg3, limit: 1}, function(err, data) {
    if (err) {
      return console.log(err);
    }
    if (data.tracks.items[0] === undefined) {
      spotifyQuery("The Sign Ace of Base");
    }
    else{
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name); 
      console.log("Song: " + data.tracks.items[0].name);
      if(data.tracks.items[0].preview_url === null){
        console.log("Preview: No Preview Available");
      }
      else{
        console.log("Preview: " + data.tracks.items[0].preview_url);
      }
      console.log("Artist: " + data.tracks.items[0].album.name)
  }
  });
}

var movieThis = function(){
  var request = require('request');
  var movie = arg3;
  if(movie === undefined){
    movie = "Mr. Nobody";
  }
  request("http://www.omdbapi.com/?apikey=40e9cece&t=" + movie + "&y=&plot=short&r=json", function (error, response, body) {
    
    var movieData = JSON.parse(body);
    console.log("Title: " + movieData.Title);
    console.log("Year: " + movieData.Year);
    console.log("IMDB Rating: " + movieData.imdbRating);
    console.log("Country: " + movieData.Country);
    console.log("Language: " + movieData.Language);
    console.log("Plot: " + movieData.Plot);
    console.log("Actors: " + movieData.Actors);
    console.log("Website: " + movieData.Website);

  });
};

var doIt = function(){
  // console.log("need to pass arguments")
  var fs = require("fs");

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    console.log(dataArr);
    arg2 = dataArr[0];
    arg3 = dataArr[1];
    console.log(arg2)
    console.log(arg3)
    liri();
  }); 
}

// As always, we grab the fs package to handle read/write


var liri = function(){
  switch(arg2){
    case "spotify-this-song":
      spotifyQuery();
      break;
    case "my-tweets":
      myTweets();
      break;
    case "movie-this":
      movieThis();
      break;
    case "do-what-it-says":
      doIt();
      break;
    default:
      console.log("oops, invalid request")
  }
}

liri();

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.

// - - -

// ### Minimum Requirements

// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed.

