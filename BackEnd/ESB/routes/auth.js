
var express = require('express');
var router = express.Router();
var AuthController = require('../app/controllers/AuthController.js');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// create cart or return if exist
router.post('/register', jsonParser, function(req, res, next) {
	let userId = req.body.user_id;
	let sessionId = req.sessionID;

	(async() => {
		let register = await new AuthController().register(req, res);
		res.status(register.code).json(register.response);
    })();
	
});

// Get cart
router.get('/:cart_id', function(req, res, next) {
	let cartData = Cart.getCartData(req.params.cart_id);
	cartData.then(result => {
		if( result == [] ){
			res.status(404).json({
				'result': {
					'error': "Carrito no encontrado"
				} 
			});
		} else {
			res.status(200).json({
				'data':result
			});
		}
	}).catch(error => {
		res.status(422).json(error);
	});
});

// get cart totals
router.get('/:cart_id/totals', function(req, res, next) {
	(async() => {
        totals = await new AuthController().getTotals(req.params.cart_id);
        res.status(totals.code).json(totals.response);
        return;
    })();
});

// add product
router.post('/:cart_id/product', jsonParser, function (req, res, next) { 
	let cartData = new AuthController().addProduct(req.params.cart_id, req.body.product_id, req.body.quantity, req.body.replace);
	cartData.then(result => {
		res.status(result.code).json(result.response);
	}).catch(error => {
		console.log(error);
		res.status(422).json(error);
	});
});

// delete product
router.post('/:cart_id/product/delete', jsonParser, function (req, res, next) { 
	let cartData = new AuthController().deleteProduct(req.params.cart_id, req.body.product_id);
	cartData.then(result => {
		res.status(result.code).json(result.response);
	}).catch(error => {
		res.status(422).json(error);
	});
});

// totals

module.exports = router;
