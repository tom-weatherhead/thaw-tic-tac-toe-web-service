// thaw-tic-tac-toe-web-service/app.js

// A Web server that makes the functionality in the Tic-Tac-Toe engine in thaw-tic-tac-toe-engine available as a Web service.

const express = require('express');

const gameEngine = require('thaw-tic-tac-toe-engine');

const app = express();

// **** Request Event Handlers: Begin ****

app.get('/tictactoe', function (req, res) {
	try {
		let boardWidth = 3;
		let boardString = 'X X   O  ';
		let maxPly = 2;
		let result = gameEngine.findBestMove(boardString, maxPly);

		let boardArray = boardString.split('');

		boardArray[result.bestRow * boardWidth + result.bestColumn] = result.player;

		console.log('After:', boardArray.join(''));

		result.newBoardString = boardArray.join('');

		console.log('GET /tictactoe : Responding with JSON result:', result);
		res.json(result);
	} catch (error) {
		console.error('GET /tictactoe threw an exception:', error);
		res.sendStatus(500);
		// Or res.status(500).send(error.message);
	}
});

// **** Request Event Handlers: End ****

module.exports = app;

// End of File.
