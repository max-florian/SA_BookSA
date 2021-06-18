var db = require('./Conexion');
var ms = require('../responses/common.js');
  	
class Order {
	constructor(id){
		this.id = id;
	}

	static async createOrder(cartId, details, userId, paymentMethod, shippingMethod, address){
		let metodoPago = await this.metodPagoExiste(paymentMethod);
		let precioEnvio = await this.precioEnvio(shippingMethod);

		if (!metodoPago) {
			return false;
		}

		if (precioEnvio < 0) {
			return false;
		}

		let query = `insert into ordenes(id_usuario, estado, metodo_pago, metodo_envio, costo_envio, fecha_crea) values (?, 1, ?, ?, ?, now()); `;
		let saved = true;

		await db.execute(query, [userId, paymentMethod, shippingMethod, precioEnvio])
			.then(result => {}).catch(error => {
				console.log(error);
				saved = false;
				// catch error
			});

		query = `select last_insert_id() as id;`;
		let orderId = 0;


		if (saved) {
			await db.execute(query, [])
				.then(result => {
					orderId = result[0]['id'];
				}).catch(error => {
					console.log(error);
					saved = false;
					// catch error
				});
		}

		if (saved) {
			query = '';
			let params = [];
			for (var i = 0; i < details.length; i++) {
				query += `insert into detalle_ordenes (id_orden, id_libro, precio, cantidad) values (?,?,?,?); `;
				params.push(orderId)
				params.push(details[i].product_id);
				params.push(details[i].precio);
				params.push(details[i].cantidad);
			}

			await db.execute(query, params)
				.then(result => {}).catch(error => {
					console.log(error);
					saved = false;
					// catch error
				});
		}

		if (saved) {
			query = `delete from detalle_carros where id_carro = ?`;

			await db.execute(query, [cartId ])
				.then(result => {}).catch(error => {
					console.log(error);
					saved = false;
					// catch error
				});
		}
		
		return saved;
	}

	static async getOrderStatus (){
		let query = `select * from order_status`;
		let statuses = null;
		await db.execute(query,[])
			.then(result => {
				if (result.length > 0){
					statuses = result;
				}
			}).catch(error => {
				// catch error
				console.log(error);
			});
		return statuses;
	}

	static async getUser (userId){
		let query = `select id, tipo as type from usuarios where id = ?`;
		let user = null;
		await db.execute(query,[userId])
			.then(result => {
				if (result.length > 0){
					user = result[0];
				}
			}).catch(error => {
				// catch error
				console.log(error);
			});
		return user;
	}

	//comentario

	static async getAllOrders (userId, userType){
		let query = `select 
						o.id,
						o.fecha_crea as date,
						u.id as user_id,
						concat(u.nombre,' ', u.apellido) as nombre,
					    u.correo
					from ordenes o
					inner join usuarios u
					on u.id = o.id_usuario`;
		
		if (userType == 'editorial') {
			query += ` inner join detalle_ordenes od
						on od.id_orden = o.id
						inner join libros l
						on l.id = od.id_libro
						where l.id_editorial = ?`
		}

		if (userType == 'cliente') {
			query += ` where u.id = ?`
		}

		let orders = [];

		await db.execute(query,[userId])
			.then(result => {
				orders = result;
			}).catch(error => {
				// catch error
			});
		return orders;
	}

	static async getOrderData(orderId, userId, userType) {
		let query = `select 
						p.id,
					    p.titulo,
					    p.autor,
					    od.precio,
					    od.cantidad
					from detalle_ordenes od
					inner join libros p
					on p.id = od.id_libro
					where id_orden = ?`;
		
		if (userType == 'editorial') {
			query += ` and p.id_editorial = ?`
		}

		let details = [];

		await db.execute(query,[orderId, userId])
			.then(result => {
				details = result;
			}).catch(error => {
				// catch error
			});
		return details;
	}

	static async updateOrder (orderId, status){
		let canUpdate = true;
		let result = {
			code: 200,
			response: {
				message: ''
			}
		}

		if (status === 5) {
			let query = 'select status from `order` where id = ? and status > 2';
			await db.execute(query,[orderId]).then(data => {
				console.log(data);
				canUpdate = data.length == 0;
			}).catch(error => {
				result.code.message = ms.common_error;
				console.log(error);
			});;
		}

		if (canUpdate) {
			let query = `update \`order\` set status = ? where id = ?`;
			await db.execute(query,[status, orderId]);
		} else {
			result.code = 422;
			result.response.message = 'La orden ya ha sido procesada';
		}

		return result;
	}

	static async findUserByEmail(email) {
		let query = `select * from user where lower(email) = lower(?)`;
		let user = null;
		await db.execute(query,[email])
			.then(result => {
				if (result.length > 0) {
					user = result[0];
				}
			}).catch(error => {
				// catch error
				console.log(error)
			});
		return user;
	}

	static async createGuestUser(name, email) {
		let query = `insert into user(email, name, type, is_active ) values (lower(?),?,'customer',0); `;
		let cart = null;

		await db.execute(query, [email, name])
			.then(result => {
				cart = result;
			}).catch(error => {
				console.log(error);
				// catch error
			});
		
		return cart;
	}

	static async metodPagoExiste(idMetodoPago) {
		let query = `select * from metodo_pagos where id = ? and estado = 1;`;
		let exist = false;

		await db.execute(query, [idMetodoPago])
			.then(result => {
				if (result.length > 0){
					exist = true;
				}
			}).catch(error => {
				console.log(error);
				// catch error
			});
		
		return exist;
	}

	static async precioEnvio(idEnvio){
		let query = `select precio from metodo_envio where id = ? and estado = 1;`;
		let price = -1;

		await db.execute(query, [idEnvio])
			.then(result => {
				if (result.length > 0 && result[0]['precio'] !== undefined){
					price = result[0]['precio'];
				}
			}).catch(error => {
				console.log(error);
				// catch error
			});
		
		return price;
	}
}

module.exports = Order;