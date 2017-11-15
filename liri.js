
//=================== global ====================


//Variables
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var Request = require("request");
var fs = require("fs");
var keys = require('./keys.js');
var operator = process.argv[2];
var user_input = [];

//User input verification
if(operator === "movie-this" && process.argv[3] === undefined){
	user_input.push("Mr. Nobody")
} else 

if (operator === "spotify-this-song" && process.argv[3] === undefined){
	user_input.push("The Sign Ace of Base")
} else 

for (var i = 3; i < process.argv.length; i++){
	user_input.push(process.argv[i].trim());
};


//=================== clients ====================


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


//=================== twitter ====================


//Tweet operator validation
if(operator === "my-tweets"){
	
//Setting twitter parameters
var params = {screen_name: 'zeuspowerinc'};

	//Calling twitter using 'get' method
	twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(!error) {
			for (var i = 0; i < 20; i++){

				//Print data
				console.log(tweets[i].text + '\n'
							+tweets[i].created_at);		
			}
		}
	});
}


//=================== fs ====================


//FS pperator validation
if(operator === "do-what-it-says") {

	//FS read method for target file "random.txt"
	fs.readFile("random.txt", 'utf8', function(error, data) {
		if(error) {
			return console.log(error);
		} 
		console.log(data);
	
		var dataArray = data.replace(","," ");
	
		console.log(dataArray);

		global.operator = dataArray[0];
		});
	};

//// HERE IS THE ISSUE: the operator is still "do-what-it-says", it isn't changing //////

console.log(operator); 
console.log(user_input);


//=================== spotify ====================


//Spotify operator validation
if(operator === "spotify-this-song"){

	//Calling spotify using 'search' method
	spotify.search({ type: 'track', query: user_input, limit: 1}, function(err, data){
		if (err) {
			return console.log('Error occured: '+ err);
		}
	//Print data
	console.log("Artist(s): "+data.tracks.items[0].album.artists[0].name+ '\n'
				+"Song: "+data.tracks.items[0].name+ '\n'
				+"Preview: "+data.tracks.items[0].album.href+ '\n'
				+"Album: "+data.tracks.items[0].album.name);
	});
}


//=================== omdb ====================


//OMDB operator validation
if(operator === "movie-this") {

	//OMDB using 'request' method
	new Request("http://www.omdbapi.com/?t="+user_input+"&apikey=40e9cece&", function(error, response, data) {
		if (!error && response.statusCode === 200){

			//Parse data into readable format
			var movie = JSON.parse(data);

			//Print data
			console.log("Title: "+movie.Title+ '\n'
						+"Year: "+movie.Year+ '\n'
						+"IMDB Rating: "+movie.imdbRating+ '\n'
						+"RT Rating: "+movie.Ratings[1].Value+ '\n'
						+"Country: "+movie.Country+ '\n'
						+"Language: "+movie.Language+ '\n'
						+"Plot: "+movie.Plot+ '\n'
						+"Actors: "+movie.Actors);
		}
	});
}


