// thaw-tic-tac-toe-web-service/src/app.js

// A Web server that makes the functionality in the Tic-Tac-Toe engine in thaw-tic-tac-toe-engine available as a Web service.

'use strict';

const gameEngine = require('thaw-tic-tac-toe-engine');
const minMaxPly = gameEngine.minMaxPly;	// 1;
const maxMaxPly = gameEngine.maxMaxPly;	// 6;

const express = require('express');
const app = express();

// app.use(function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "null");
	// res.header("GET");
	// next();
// });

var router = express.Router();

let errorMessages = {
	gameEngineError: error => {
		return 'The Tic-Tac-Toe game engine threw an exception: ' + error.message;
	},
	maxPlyOutOfRange: maxPly => {
		return 'maxPly \'' + maxPly + '\' is not in the range [' + minMaxPly + ', ' + maxMaxPly + '].';
	}
};

router.get('/:board([EXO]{9})/:maxPly([0-9]{1})', function(req, res) {
	// Global replace in string: See https://stackoverflow.com/questions/38466499/how-to-replace-all-to-in-nodejs
	let boardString = req.params.board.replace(/E/g, ' ');		// Replaces all 'E' with ' '.
	let maxPly = parseInt(req.params.maxPly, 10);

	if (maxPly < minMaxPly || maxPly > maxMaxPly) {
		let message = errorMessages.maxPlyOutOfRange(maxPly);

		console.error(message);
		res.status(400).send(message);
	} else {

		try {
			let result = gameEngine.findBestMove(boardString, maxPly);

			res.json(result);
		} catch (error) {
			let message = errorMessages.gameEngineError(error);

			console.error(error);
			console.error(message);
			// For a description of the Node.js Error class, see https://nodejs.org/api/errors.html#errors_class_error
			res.status(500).send(message);
		}
	}
});

app.use('/tictactoe', router);

module.exports = {
	app: app,
	errorMessages: errorMessages,
	gameEngine: gameEngine
};

// End of File.
