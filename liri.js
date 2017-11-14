//Here are the global variables
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var user_input = [];

//This collects the arguments and pushes them to user_input array
for (var i = 2; i < process.argv.length; i++){
	user_input.push(process.argv[i].trim());
};

//This is twitter's client variable
var client = new Twitter ({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token_key: keys.access_token_key,
	access_token_secret: keys.access_token_secret
});

//This is the Spotify variable
var spotify = new Spotify ({
	id: '15233c110ca34cca9ec892298c351ca9',
	secret: '95cbe30033be459bb0bb989ac4b3c252'
});

//twitter's get parameters
var params = {screen_name: 'zeuspowerinc'};

//If function to activate twitter client
if(user_input === "my-tweets"){
	
	//Calling client (twitter) to get tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(!error) {
			for (var i = 0; i < 20; i++){
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);		
			}
		}
	});
}

//This uses the Spotify 'search' method to pull data, based on user_input
spotify.search({ type: 'track', query: user_input, limit: 1}, function(err, data){
	if (err) {
		return console.log('Error occured: '+ err);
	}
console.log("Artist(s): "+data.tracks.items[0].album.artists[0].name);
console.log("Song: "+data.tracks.items[0].name);
console.log("Preview: "+data.tracks.items[0].album.href);
console.log("Album: "+data.tracks.items[0].album.name);
});

