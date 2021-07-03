
var express = require('express');
var router = express.Router();
var AuthController = require('../app/controllers/AuthController.js');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

router.post('/register', jsonParser, function(req, res, next) {
	(async() => {
		let register = await new AuthController().register(req, res);
		res.status(register.code).json(register.response);
    })();
});

router.post('/login', jsonParser, function(req, res, next) {
	(async() => {
		let login = await new AuthController().login(req, res);
		res.status(login.code).json(login.response);
    })();
});

module.exports = router;
