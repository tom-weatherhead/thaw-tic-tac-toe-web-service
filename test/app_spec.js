// thaw-tic-tac-toe-web-service/test/app_spec.js

'use strict';

// Use chai and chai-http to test our app.
// See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html

const chai = require('chai');
const chaiHttp = require('chai-http');

const pkg = require('..');
const app = pkg.app;
const gameEngine = pkg.gameEngine;
const test_descriptors = gameEngine.test_descriptors;

chai.use(chaiHttp);

const expect = chai.expect;

describe('App', function () {
	test_descriptors.forEach(test_descriptor => {
		describe(test_descriptor.name, function () {
			it('Rocks!', function (done) {
				// Arrange
				const url = '/tictactoe/' + test_descriptor.boardString.replace(/ /g, 'E') + '/' + test_descriptor.maxPly;

				// Act
				chai.request(app).get(url).end(function (error, result) {
					// Assert
					expect(error).to.be.null;		// eslint-disable-line

					// Chai.js has a flexible, fluent syntax for "expect" :
					// expect(result).not.null;			// eslint-disable-line no-unused-expressions
					// expect(result).to.not.be.null;	// eslint-disable-line no-unused-expressions
					expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions

					const resultBody = result.body;

					expect(resultBody).to.be.not.null;		// eslint-disable-line no-unused-expressions

					test_descriptor.verificationFunction(gameEngine, expect, resultBody);

					done();
				});
			});
		});
	});
});
