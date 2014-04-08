/* Client/Server Demo Code
 * Technion Web Lab 2014
 * Copyright (C) 2014, Uri Shaked. Code released under the MIT License.
 */

var express = require('express');

var LISTEN_PORT = process.env.OPENSHIFT_NODEJS_PORT || 8296;
var LISTEN_IP = process.env.OPENSHIFT_NODEJS_PORT || '127.0.0.1';

/* Create an express application. `app` is a common variable name used in many express.js tutorials */
var app = express();

/* This variable will hold our high score table. At the beginning, the table is empty */
var highscore = [];

/*
 * This exposes everything under the client directory through the webserver.
 * __dirname is a magic variable in node.js, it always points to the directory of the current JS file.
 */
app.use(express.static(__dirname + '/client'));

/**
 * The bodyParser automatically handles the parsing of JSON requests for us. Don't forget to include it
 * if you expect to process JSON data in your HTTP requests.
 */
app.use(express.bodyParser());


/*
 * app.get() defines an handler for HTTP GET requests. You give it a path and a function to execute
 * whenever a request with this path arrives.
 */
app.get('/highscore', function (req, res) {
	res.json({
		scores: highscore
	});
});

/*
 * app.post() defines an handler for HTTP GET requests. You can peek into the request data inside req.body.
 */
app.post('/highscore/add', function (req, res) {
	// Add the information received from the client as a new high score
	if (req.body.name && req.body.score) {
		highscore.push({
			name: req.body.name,
			score: req.body.score
		});
	}

	// Sort the highscore array, based on score
	highscore = highscore.sort(function (left, right) {
		return right.score - left.score;
	});

	// Finally, send the client the updated high-score
	res.json({
		scores: highscore
	});
});

/*
 * app.listen() starts the HTTP server on the given TCP port.
 */
app.listen(LISTEN_PORT, LISTEN_IP, function () {
	console.log('Listening on ' + LISTEN_PORT + '...');
});
