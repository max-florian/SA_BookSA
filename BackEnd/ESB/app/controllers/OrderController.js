var Order = require('../models/Order.js');
var Cart = require('../models/Cart.js');
var ms = require('../responses/common.js');

class OrderController {
	createOrder = async function (request) {
		let cart = null;
		let address = request.address;
		let paymentMethod = request.payment;
		let shippingMethod = request.shipping;

		let result = {
			code: 200,
			response: {
				message:'Orden creada con éxito'
			}
		}

		try {
			cart = await Cart.getCart(request.cart_id);
			let userId = null;

			if (cart == null) {
				result.code = 404;
				result.response.message = "Carrito de compra no encontrado";
				return result;
			}

			let totals = await Cart.getTotals(request.cart_id);

			if (totals.length == 0) {
				result.code = 422;
				result.response.message = 'Carro de compras vacio';
				return result;
			}

			if (cart['id_usuario'] == null) {
				// if (name != null && email != null){
				// 	let user = await Order.findUserByEmail(email);

				// 	if (user == null) {
				// 		await Order.createGuestUser(name, email);
				// 		user = await Order.findUserByEmail(email);
				// 	}
				// 	userId = user['id'];
				// }else{
					result.code = 422;
					result.response.message = 'Faltan datos de usuario';
					return result;
				// }
			}else {
				userId = cart['id_usuario'];
			}

			let success = await Order.createOrder(request.cart_id, totals, userId, paymentMethod, shippingMethod, address);

			if (!success){
				result.code = 422;
				result.response.message = ms.common_error;
			}
			
		}catch (error) {
			result.code = 422;
			result.response.message = ms.common_error;
			console.log(error);
		}

		return result;
	}

	getOrders = async function(userId) {
		let result = {
			code: 200,
			response: {}
		}

		try {
			let user = await Order.getUser(userId);
			if (user == null) {
				result.code = 404
				result.response.message = 'usuario no encontrado';
				return result;
			}

			result.response = {data:[]};
			let ordersHeader = await Order.getAllOrders(userId, user['type']);
			let orders = [];
			let order = null;

			if (ordersHeader.length > 0) {
				for (var i = 0; i < ordersHeader.length; i++) {
					order = ordersHeader[i];
					order['details'] = await Order.getOrderData(order['id'], userId, user['type']);
					orders.push(order);
				}
				result.response.data = orders;
			}

		}catch (error) {
			result.code = 422;
			result.response.message = ms.common_error;
			console.log(error);
		}

		return result;
		
	}

	updateOrder = async function (orderId, status) {
		let result = {
			code: 200,
			response: {
				message: 'Orden actualizada con exito'
			}
		}

		try {
			result = await Order.updateOrder(orderId, status);
		}catch (error) {
			result.code = 422;
			result.response.message = ms.common_error;
			console.log(error);
		}

		return result;
		
	}
}

module.exports = OrderController;