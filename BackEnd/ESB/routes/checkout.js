
var express = require('express');
var router = express.Router();
var CartController = require('../app/controllers/CartController.js');
var OrderController = require('../app/controllers/OrderController.js');
var Cart = require('../app/models/Cart.js');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// create orders
router.post('', jsonParser, function(req, res, next) {
	let data = req.body;
	(async() => {
		let order = await new OrderController().createOrder(data);
		res.status(order.code).json(order.response);
    })();
	
});

// Get orders
router.get('/:user_id', function(req, res, next) {
	let cartData = new OrderController().getOrders(req.params.user_id);
	cartData.then(result => {
		if( result == [] ){
			res.status(404).json({
				'result': {
					'error': "No se encontraron ordenes"
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

// Get orders
router.get('/:userId/details/:orderId', function(req, res, next) {
	let cartData = new OrderController().getOrderDetails(req.params.userId);
	cartData.then(result => {
		if( result == [] ){
			res.status(404).json({
				'result': {
					'error': "No se encontraron ordenes"
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

module.exports = router;
