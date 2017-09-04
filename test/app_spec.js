// thaw-tic-tac-toe-web-service/test/app_spec.js

'use strict';

// Use chai and chai-http to test our app.
// See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html

const pkg = require('..');
const app = pkg.app;
const gameEngine = pkg.gameEngine;
const test_descriptors = gameEngine.test_descriptors;

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('App', function () {
	test_descriptors.forEach(test_descriptor => {
		describe(test_descriptor.name, function () {
			it('Rocks!', function (done) {
				// Arrange
				const url = '/tictactoe/' + test_descriptor.boardString.replace(/ /g, 'E') + '/' + test_descriptor.maxPly;

				// Act
				chai.request(app).get(url).end(function (error, result) {
					// Assert
					expect(error).to.be.null;				// eslint-disable-line no-unused-expressions
					expect(result).to.be.not.null;			// eslint-disable-line no-unused-expressions
					expect(result.body).to.be.not.null;		// eslint-disable-line no-unused-expressions
					test_descriptor.verificationFunction(gameEngine, expect, result.body);
					done();
				});
			});
		});
	});

	if (gameEngine.minMaxPly > 0) {
		describe('maxPly is zero', function () {
			it('Rocks!', function (done) {
				// Arrange
				const maxPly = 0;
				const url = '/tictactoe/EEEEEEEEE/' + maxPly;

				// Act
				chai.request(app).get(url).end(function (error, result) {
					// Assert
					expect(error).to.be.not.null;				// eslint-disable-line
					expect(result).to.have.status(400);
					done();
				});
			});
		});
	}

	describe('maxPly is zero', function () {
		it('Rocks!', function (done) {
			// Arrange
			const maxPly = gameEngine.maxMaxPly + 1;
			const url = '/tictactoe/EEEEEEEEE/' + maxPly;

			// Act
			chai.request(app).get(url).end(function (error, result) {
				// Assert
				expect(error).to.be.not.null;				// eslint-disable-line
				expect(result).to.have.status(400);
				done();
			});
		});
	});

	// TODO: Test that HTTP status code 400 is returned if maxPly < gameEngine.minMaxPly or maxPly > gameEngine.maxMaxPly ; also check the error message in the HTTP response by comparing it to the string returned by gameEngine.errorMessages.maxPlyOutOfRange(maxPly)
});
