// tom-weatherhead/thaw-tic-tac-toe-web-service/Gruntfile.js

'use strict';

module.exports = require('thaw-config').grunt({
	eslint: true,
	mocha: true,
	webpack: false,
	forClient: false,
	forServer: true
});
