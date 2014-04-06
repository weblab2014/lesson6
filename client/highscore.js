(function () {
	'use strict';

	var highscoreBox = document.getElementById('highscore-box');

	/**
	 * Shows / hides the loading indicator.
	 *
	 * @param {boolean} shouldShow Determines whether to show or hide the "Loading high score data..." indicator
	 */
	function showLoading(shouldShow) {
		document.querySelector('#highscore-box .loading').style.display = shouldShow ? '' : 'none';
	}


	/**
	 * Removes all score elements from the highscore box, and also the no-score-message if it is present
	 */
	function cleanupHighscoreBox() {
		var elements = document.querySelectorAll('#highscore-box .score-entry, #highscore-box .no-score-message');
		for (var i = 0; i < elements.length; i++) {
			elements[i].remove();
		}
	}

	/**
	 * Creates a DOM tree to display a single score entry
	 * @param {Object} score A single score entry
	 * @return {Element} DOM Element for the new score entry
	 */
	function scoreToDomElement(score) {
		var nameElement = document.createElement('span');
		nameElement.className = 'score-name';
		nameElement.textContent = score.name;

		var scoreElement = document.createElement('span');
		scoreElement.className = 'score-score';
		scoreElement.textContent = score.score;

		var containerElement = document.createElement('div');
		containerElement.className = 'score-entry';
		containerElement.appendChild(nameElement);
		containerElement.appendChild(scoreElement);
		return containerElement;
	}

	/**
	 * Called when we get an high-score reply from the server
	 * @this The XMLHttpRequest that initiated the request
	 */
	function highscoreReceived() {
		var highscoreData = JSON.parse(this.responseText);
		cleanupHighscoreBox();
		highscoreData.scores.forEach(function (score) {
			var scoreDom = scoreToDomElement(score);
			highscoreBox.appendChild(scoreDom);
		});
		if (highscoreData.scores.length === 0) {
			var noScoreElement = document.createElement('div');
			noScoreElement.innerText = 'No score yet. Be the first to post your score!';
			noScoreElement.className = 'no-score-message';
			highscoreBox.appendChild(noScoreElement);
		}
		showLoading(false);
	}


	/**
	 * Retrieves the most up-to-date high score from the server.
	 */
	function loadHighscore() {
		var request = new XMLHttpRequest();

		request.onload = highscoreReceived;
		request.open('get', '/highscore');
		request.send(null);
	}

	/**
	 * Called whenever the user clicks on "add new score"
	 */
	function addNewScoreClicked() {
		// Get the new score information from the form
		var userName = document.getElementById('score-input-name').value;
		var userScore = parseInt(document.getElementById('score-input-score').value, 10);
		var newEntry = {
			name: userName,
			score: userScore
		};

		// Create & Send the score request to the server
		var request = new XMLHttpRequest();
		request.onload = highscoreReceived;
		request.open('post', '/highscore/add');
		// The new line tells the server that we are encoding our data as JSON
		request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		request.send(JSON.stringify(newEntry));

		// Clean up the form
		document.getElementById('score-input-name').value = '';
		document.getElementById('score-input-score').value = '';

		showLoading(true);
	}

	/**
	 * Initializes the application.
	 */
	function init() {
		loadHighscore();
		document.getElementById('score-button-add').addEventListener('click', addNewScoreClicked);
	}

	init();
}());