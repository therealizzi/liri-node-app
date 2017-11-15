//======================= background ========================


//This nodejs code is intended to operate with the
//following NPM packages installed:

	// "file-system": "^2.2.2",
   	// "node-spotify-api": "^1.0.7",
    	// "request": "^2.83.0",
    	// "twitter": "^1.7.1"


//======================= global ========================


//Node packages 
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var Request = require("request");
var fs = require("fs");
var keys = require('./keys.js');

//Variables
var operator = process.argv[2];
var user_input = [];


//======================= clients =======================


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


//=================== input verification ====================


//Handle movie blanks
if(operator === "movie-this" && process.argv[3] === undefined){

	//Use default search
	user_input.push("Mr. Nobody")
} else 

//Handle song blanks
if (operator === "spotify-this-song" && process.argv[3] === undefined){
	
	//Use default search
	user_input.push("The Sign Ace of Base")
} else 

//Handle non-blanks
for (var i = 3; i < process.argv.length; i++){

	//Load arguments
	user_input.push(process.argv[i].trim());
};

//Tweet operator validation & function call
if(operator === "my-tweets"){
	myTweets()
};

//Spotify operator validation & function call
if(operator === "spotify-this-song"){
	spotifyThisSong(user_input)
};

//OMDB operator validation & function call
if(operator === "movie-this") {
	movieThis(user_input)
};

//FS operator validation & function call
if(operator === "do-what-it-says") {
	doWhatItSays()
}


//===================== functions ======================


//Twitter  
function myTweets() {	

	//Set get parameters
	var params = {screen_name: 'zeuspowerinc'};

	//Initiate 'get' method
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

//Spotify  
function spotifyThisSong() {

	//Set spotify search parameters
	spotify.search({ type: 'track', query: user_input, limit: 1}, function(err, data){
		if (err) {
			return console.log('Error occured: '+ err);
		}

		//Print data
		console.log("Artist(s): "+data.tracks.items[0].album.artists[0].name+ '\n'
					+"Song: "+data.tracks.items[0].name+ '\n'
					+"Preview: "+data.tracks.items[0].album.href+ '\n'
					+"Album: "+data.tracks.items[0].album.name
		);
	});
}

//OMDB 
function movieThis() {

	//Set ombd request parameters
	new Request("http://www.omdbapi.com/?t="+user_input+"&apikey=40e9cece&", function(error, response, data) {
		if (!error && response.statusCode === 200){

			//Parse data into readable format
			var movie = JSON.parse(data);

			//Print data
			try {	console.log("Title: "+movie.Title+ '\n'
							+"Year: "+movie.Year+ '\n'
							+"IMDB Rating: "+movie.imdbRating+ '\n'
							+"RT Rating: "+movie.Ratings[1].Value+ '\n'
							+"Country: "+movie.Country+ '\n'
							+"Language: "+movie.Language+ '\n'
							+"Plot: "+movie.Plot+ '\n'
							+"Actors: "+movie.Actors);
			} catch(err) {
				console.log("Are you sure that's a movie?");
			}
		}
	});
}

//File source ("FS")
function doWhatItSays() {

	//FS read method for target file "random.txt"
	fs.readFile("random.txt", 'utf8', function(error, data) {
		if(error) {
			return console.log(error);
		}

		//Break FS data string into array
		var dataArray = data.split(",");

		//Define local variables
		operator = dataArray[0];
		user_input.push(dataArray[1]);

		//Call appropriate function
		if(operator === "spotify-this-song"){
			spotifyThisSong(user_input)
		} else

		if(operator === "movie-this"){
			movieThis(user_input)
		} else

		if(operator === "my-tweets"){
			myTweets()
		}
	});
};


//========================= end ==========================
