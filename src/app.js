// thaw-tic-tac-toe-web-service/src/app.js

// A Web server that makes the functionality in the Tic-Tac-Toe engine in thaw-tic-tac-toe-engine available as a Web service.

'use strict';

const gameEngine = require('thaw-tic-tac-toe-engine');
const minMaxPly = gameEngine.minMaxPly;	// 1;
const maxMaxPly = gameEngine.maxMaxPly;	// 6;

const express = require('express');
const app = express();

const router = express.Router();				// eslint-disable-line new-cap

const errorMessages = gameEngine.errorMessages;

router.get('/:board([EXO]{9})/:maxPly([0-9]{1})', function (req, res) {
	// Global replace in string: See https://stackoverflow.com/questions/38466499/how-to-replace-all-to-in-nodejs
	const boardString = req.params.board.replace(/E/g, ' ');		// Replaces all 'E' with ' '.
	const maxPly = parseInt(req.params.maxPly, 10);

	if (maxPly < minMaxPly || maxPly > maxMaxPly) {
		const message = errorMessages.maxPlyOutOfRange(maxPly, minMaxPly, maxMaxPly);

		console.error(message);
		res.status(400).send(message);
	} else {

		try {
			const result = gameEngine.findBestMove(boardString, maxPly);

			res.json(result);
		} catch (error) {
			// const message = errorMessages.gameEngineError(error.message);
			const message = error.message;

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
	gameEngine: gameEngine
};

// End of File.
