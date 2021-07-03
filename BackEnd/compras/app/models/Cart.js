var db = require('./Conexion');
var ms = require('../responses/common.js');
  	
class Cart {
	constructor(id){
		this.id = id;
	}

	static async findCart(userId) {

		let query = `select carros.id, carros.id_usuario, usuarios.correo from carros, usuarios where carros.id_usuario=usuarios.id and carros.id_usuario = ? `;
		let cart = null;

		await db.execute(query, [userId])
			.then(result => {
				cart = result;
			}).catch(error => {
				// catch error
				console.log(error);
			});
		return cart;
	}

	static async getCartData  (id){
		let query = `select * from carros where id = ?`;
		return await db.execute(query,[id]);
	}

	static async getCart (id){
		let query = `select * from carros where id = ?`;
		let cart = null;
		await db.execute(query,[id])
			.then(result => {
				if (result.length > 0){
					cart = result[0];
				}
			}).catch(error => {
				console.log(error);
			});
		return cart;
	}

	static getUserCartData  (user_id){
		let query = `select * from carros where id_usuario = ?`;
		return db.ejecutar(query,[user_id]);
	}

	static async cartAvailable (cart_id){
		let query = `select * from carros where id = ? `;
		let test = false;
		await db.execute(query,[cart_id])
			.then(result => {
				if (result.length > 0){
					test = true;
				}
			}).catch(error => {
				// catch error
			});
		return test;
	}

	static async createCart(userId) {
		let query = `insert into carros (id_usuario) values (?); `;
		let cart = null;

		await db.execute(query, [userId])
			.then(result => {
				cart = result;
			}).catch(error => {
				console.log(error);
				// catch error
			});
		
		return cart;
	}

	async deleteProduct(idLibro) {
		let query = `select id_libro from detalle_carros where id_carro = ? and id_libro = ?`;
		
		let result = {
			code: 200,
			response: {
				message: ''
			}
		}

		await db.execute(query,[this.id, idLibro])
			.then(data => {
				if (data.length == 0){
					result.code = 404;
					result.response.message = 'Producto no existe en el carros de compra';
				}
			}).catch(error => {
				// catch error
				console.log(error);
				result.code = 422;
				result.response.message = ms.common_error;
			});
		
		if (result.code !== 200) {
			return result;
		}

		let params = [];

		query = 'delete from detalle_carros where id_carro = ? and id_libro = ?'
		params = [this.id, idLibro];

		await db.execute(query,params)
			.then(data => {
				result.response.message = 'Libro eliminado con exito del carrito';
			}).catch(error => {
				console.log(error);
				result.code = 422;
				result.response.message = ms.common_error;
			});
		return result;
	}

	async addProduct(idLibro, quantity, replace) {
		let query = `select id_libro, cantidad from detalle_carros where id_carro = ? and id_libro = ?`;
		let hasBook = false;
		
		let result = {
			code: 200,
			response: {
				message: ''
			}
		}

		await db.execute(query,[this.id, idLibro])
			.then(result => {
				if (result.length > 0){
					hasBook = true;
				}
			}).catch(error => {
				// catch error
				console.log(error);
				result.code = 422;
				result.response.message = ms.common_error;
			});
		
		if (result.code !== 200) {
			return result;
		}

		let params = [];

		if (hasBook) {
			let quantityStr = !replace ? 'cantidad + ' + quantity : quantity;
			query = `update detalle_carros set cantidad = ${quantityStr} where id_carro  = ? and id_libro = ?`
			params = [this.id, idLibro ];
		} else {
			query = 'insert into detalle_carros (id_carro, id_libro, cantidad) values (?,?,?)'
			params = [this.id, idLibro, quantity ];
		}

		await db.execute(query,params)
			.then(data => {
				result.response.message = 'Libro agregado con exito';
			}).catch(error => {
				console.log(error);
				result.code = 422;
				result.response.message = ms.common_error;
			});
		return result;
	}

	static async getTotals(cartId) {
		let totals = null;
		let query = `select 
					p.id as product_id,
					p.titulo,
					p.autor, 
			        p.precio,
					cd.cantidad,
			        us.nombre
				from carros c 
				join detalle_carros cd 
				on c.id = cd.id_carro
				join libros p
				on p.id = cd.id_libro
			    join usuarios us
			    on us.id = p.id_editorial
				where c.id = ?	;
					;`
		await db.execute(query, [cartId])
			.then(result => {
				totals = result;
			}).catch(error => {
				console.log(error);
				// catch error
			});

		return totals;
	}

	static async disableCart(cartId) {
		let query = `update cart set status = 0 where id = ?;`
		await db.execute(query, [cartId])
			.then(result => {}).catch(error => {
				console.log(error);
				// catch error
			});

		return totals;
	}
}

module.exports = Cart;