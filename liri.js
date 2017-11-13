//Here are the global variables
var Twitter = require('twitter');
var keys = require('./keys.js');
var user_input = process.argv[2];

//This is twitter's client variable
var client = new Twitter ({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token_key: keys.access_token_key,
	access_token_secret: keys.access_token_secret
});

//Twitter's get parameters
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
