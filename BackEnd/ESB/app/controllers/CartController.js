var Cart = require('../models/Cart.js');
var ms = require('../responses/common.js');

class CartController {

	findCart = async function (userId) {
		let cart = null;

		let result = {
			code: 200,
			response: {
				message:'',
				cart_id: 0
			}
		}

		try {
			cart = await Cart.findCart(userId);

			if (cart == null) {
				result.code = 422;
				result.message = ms.common_error;
				return result;
			}

			if (cart.length == 0) {
				await Cart.createCart(userId);
				cart = await Cart.findCart(userId);
			}
			result.response.cart_id = cart[0]['id'];
		}catch (error) {
			result.code = 422;
			result.message = ms.common_error;
			//error log
		}

		return result;
	}

	getTotals = async function (cartId) {
		let cartAvailable = await Cart.cartAvailable(cartId);
		let cart = null;
		let result = {
			code: 200,
			response: {
			}
		}

		if (cartAvailable) {
			try {
				cart = await Cart.getTotals(cartId);

				if (cart == null) {
					result.code = 422;
					result.response.message = ms.common_error;
					return result;
				}

				result.response = cart;
			}catch (error) {
				result.code = 422;
				result.response.message = ms.common_error;
				console.log(error);
			}
		} else {
			result.code = 404;
			result.response = {
				"message": "Carro de compra no existe"
			}
		}

		

		return result;
	}

	addProduct = async function(cartId, productId, quantity, replace = false) {
		let cartAvailable = await Cart.cartAvailable(cartId);
		let code = 200;
		let response = {

		};

		if (quantity <= 0) {
			quantity = 1;
		}

		if (cartAvailable) {
			let cart = new Cart(cartId);
			response = await cart.addProduct(productId, quantity, replace);
			code = response.code;
			response = response.response
		} else {
			code = 404;
			response = {
				"message": "Carro de compra no existe"
			}
		}

		return {
			code: code,
			response: response
		}
		
	}

	deleteProduct = async function(cartId, productId) {
		let cartAvailable = await Cart.cartAvailable(cartId);
		let code = 200;
		let response = {

		};

		if (cartAvailable) {
			let cart = new Cart(cartId);
			response = await cart.deleteProduct(productId);
			code = response.code;
			response = response.response
		} else {
			code = 404;
			response = {
				"message": "Carro de compra no existe"
			}
		}

		return {
			code: code,
			response: response
		}
		
	}
}

module.exports = CartController;