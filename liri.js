
var Twitter = require('twitter');
var keys = require('./keys.js');
var user_input = process.argv[2];

var client = new Twitter ({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token_key: keys.access_token_key,
	access_token_secret: keys.access_token_secret
});

console.log(client); 

var params = {screen_name: 'zeuspowerinc'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if(!error) {
		console.log(tweets);
	}
});

// client.get(path, params, callback);
// client.post(path, params, callback);
// client.stream(path, params, callback);

