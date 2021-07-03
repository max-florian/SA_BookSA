var express = require('express');
var router = express.Router();
var BooksController = require('../app/controllers/BooksController.js');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// view all books
router.get('/catalogos/catalogo', jsonParser, function(req, res, next) {
	(async() => {
		let register = await new BooksController().getBooks(req, res);
		res.status(register.code).json(register.response);
    })();
	
});

// create cart or return if exist
router.post('/add_book', jsonParser, function(req, res, next) {
	(async() => {
		let addBook = await new BooksController().addBook(req, res);
		res.status(addBook.code).json(addBook.response);
    })();
	
});

module.exports = router;
