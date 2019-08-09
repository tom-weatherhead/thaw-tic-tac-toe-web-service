# thaw-tic-tac-toe-web-service
An Express.js Tic-Tac-Toe Web service.

[![Build Status](https://secure.travis-ci.org/tom-weatherhead/thaw-tic-tac-toe-web-service.svg)](https://travis-ci.org/tom-weatherhead/thaw-tic-tac-toe-web-service)
[![npm](https://img.shields.io/npm/v/thaw-tic-tac-toe-web-service.svg)](https://www.npmjs.com/package/thaw-tic-tac-toe-web-service)
[![npm](https://img.shields.io/npm/dm/thaw-tic-tac-toe-web-service.svg)](https://www.npmjs.com/package/thaw-tic-tac-toe-web-service)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/tom-weatherhead/thaw-tic-tac-toe-web-service/blob/master/LICENSE)
[![Maintainability](https://api.codeclimate.com/v1/badges/bfe5aa22262cf1f83f33/maintainability)](https://codeclimate.com/github/tom-weatherhead/thaw-tic-tac-toe-web-service/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/tom-weatherhead/thaw-tic-tac-toe-web-service/badge.svg?targetFile=package.json&package-lock.json)](https://snyk.io/test/github/tom-weatherhead/thaw-tic-tac-toe-web-service?targetFile=package.json&package-lock.json)

## Git Installation Instructions

```
git clone https://github.com/tom-weatherhead/thaw-tic-tac-toe-web-service.git
cd thaw-tic-tac-toe-web-service
npm install -g grunt
npm install
grunt
npm start
```

Note: The command "grunt" runs lint, unit tests, and security tests.

## npm Installation Instructions

```
npm install -g thaw-tic-tac-toe-web-service
thaw-tic-tac-toe-web-service
```

## Usage

The Web service uses the game engine in the npm package thaw-tic-tac-toe-game-engine. By default, the Web service listens on port 3000/TCP and responds with JSON data.

To use the Web service:

The Web service plays Tic-Tac-Toe on a 3-by-3 board. It takes two parameters:

1) boardString: A 9-character string representation of the 3-by-3 game board. Empty squares are represented by the letter 'E'. For example, the board

. O X
. X .
O . .

... would be represented by the string 'EOXEXEOEE'.

The game engine will infer which player is to move based on the relative populations of X and O pieces currently on the board.

2) maxPly: The maximum depth to which to search the game tree. By default, maxPly must be an integer no less than 1 and no greather than 6.

Sample HTTP GET request URL:

```	
http://localhost:3000/tictactoe/EEEEXEEEE/5
```

Sample JSON response:

```json
{
	"bestRow": 0,
	"bestColumn": 1,
	"bestMoveList": [
		{ "row": 0, "column": 1 },
		{ "row": 1, "column": 0 },
		{ "row": 1, "column": 2 },
		{ "row": 2, "column": 1 }
	],
	"bestScore": 1,
	"player": "O"
}
```

bestScore = 100 indicates that the indicated player can force a victory.

## License
MIT
