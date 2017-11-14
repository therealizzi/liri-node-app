//Global variables
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var Request = require("request")
var keys = require('./keys.js');
var user_input = [];

//Creating user_input array
for (var i = 3; i < process.argv.length; i++){
	user_input.push(process.argv[i].trim());
};


//=================== client variables ====================


//Twitter
var twitter = new Twitter ({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token_key: keys.access_token_key,
	access_token_secret: keys.access_token_secret
});

//Spotify
var spotify = new Spotify ({
	id: '15233c110ca34cca9ec892298c351ca9',
	secret: '95cbe30033be459bb0bb989ac4b3c252'
});


// //=================== twitter call ====================


//Argv validation
if(process.argv[2] === "my-tweets"){
	
//Setting twitter parameters
var params = {screen_name: 'zeuspowerinc'};

	//Calling to twitter
	twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(!error) {
			for (var i = 0; i < 20; i++){

				//Print data
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);		
			}
		}
	});
}


// //=================== spotify call ====================


//Argv validation
if(process.argv[2] === "spotify-this-song"){

	//Use spotify's 'search' method
	spotify.search({ type: 'track', query: user_input, limit: 1}, function(err, data){
		if (err) {
			return console.log('Error occured: '+ err);
		}
	//Print data
	console.log("Artist(s): "+data.tracks.items[0].album.artists[0].name);
	console.log("Song: "+data.tracks.items[0].name);
	console.log("Preview: "+data.tracks.items[0].album.href);
	console.log("Album: "+data.tracks.items[0].album.name);
	});
}


//=================== omdb call ====================

//OMDB
// var omdb = new Request("http://www.omdbapi.com/?apikey=40e9cece&?t="+user_input);

//Argv validation
if(process.argv[2] === "movie-this") {

	new Request("http://www.omdbapi.com/?t="+user_input+"&apikey=40e9cece&", function(error, response, body) {
		if (!error && response.statusCode === 200){
			console.log(body);
		}
	});
}

