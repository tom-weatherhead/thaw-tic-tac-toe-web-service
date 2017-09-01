// thaw-tic-tac-toe-web-service/app.js

// A Web server that makes the functionality in the Tic-Tac-Toe engine in thaw-tic-tac-toe-engine available as a Web service.

const minMaxPly = 1;
const maxMaxPly = 6;

const gameEngine = require('thaw-tic-tac-toe-engine');

const express = require('express');
const app = express();

var router = express.Router();

let errorMessages = {
};

// router.get('/:id([0-9]+)', middleware1, middleware2, function(req, res) {
router.get('/:board([EXO]{9})/:maxPly([0-9]{1})', function(req, res) {
	// console.log('req.params.board before replace: \'' + req.params.board + '\'');
	// Global replace in string: See https://stackoverflow.com/questions/38466499/how-to-replace-all-to-in-nodejs
	let boardString = req.params.board.replace(/E/g, ' ');			// Replaces all 'E' with ' '.
	// console.log('boardString after replace: \'' + boardString + '\'');
	// console.log('req.params.maxPly as string:', req.params.maxPly.toString());
	let maxPly = parseInt(req.params.maxPly, 10);
	// console.log('maxPly as int:', maxPly);
	
	// if (maxPly !== maxPly) {
		// res.status(400).send('maxPly \'' + req.params.maxPly.toString() + '\' is not an integer.');
	// } else
	if (maxPly < minMaxPly || maxPly > maxMaxPly) {
		res.status(400).send('maxPly \'' + maxPly + '\' is not in the range [' + minMaxPly + ', ' + maxMaxPly + '].');
	} else {

		try {
			let result = gameEngine.findBestMove(boardString, maxPly);

			// console.log('GET /:board([EXO]{9})/:maxPly([0-9]{1}) : result:', result);
			res.json(result);
		} catch (error) {
			console.error('engine.findBestMove() threw an exception:');
			console.error(error);
			// For a description of the Node.js Error class, see https://nodejs.org/api/errors.html#errors_class_error
			res.status(500).send('The Tic-Tac-Toe game engine threw an exception: ' + error.message);
		}
	}
});

app.use('/tictactoe', router);

module.exports = app;

// End of File.
