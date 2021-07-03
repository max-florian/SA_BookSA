function  getGroupRequest(req, group) {
	const { name, lastname, email, password, status, phone, type } = req.body;
	let key = 'g'+group;
	switch (key) {
		case 'g0':
			return req.body;
		case 'g1': // Grupo 9 que no esta
			return [];
		case 'g2': // Grupo 10
			return {
				"nombres": name,
				"apellidos": lastname,
				"email": email,
				"password": password,
				"direccion": '',
				"celuar": phone,
				"tipo": type,
				"aprobado": type === 'cliente'
			}
		case 'g3': //Grupo 11
			let rolId = type ==='cliente'? 3:1
			return {
				"nombre": name,
				"apellido": lastname,
				"correo": email,
				"password": password,
				"telefono": phone,
				"id_rol": rolId,
				"estado": rolId == 3
			}
		default:
			return null;
	}
}

function  getLoginRequest(req, group) {
	const { email, password } = req.body;
	let key = 'g'+group;
	switch (key) {
		case 'g0':
			return req.body;
		case 'g1': // Grupo 9 que no esta
			return [];
		case 'g2': // Grupo 10
			return req.body
		case 'g3': //Grupo 11
			return {
				"user": email,
				"password": password
			}
		default:
			return null;
	}
}

function formatResponse(response, group) {
	let key = 'g'+group;
	switch (key) {
		case 'g0':
			return  {
				code: response.status,
				response: response.data
			};
		// case 'g1': // Grupo 9 que no esta
		// 	return [];
		case 'g2': // Grupo 10
			return  {
				code: response.status,
				response: {
					statuscode: response.status,
					data: response.data
				}
			};
		case 'g3': //Grupo 11
			let status =response.status;

			if (response.data === false) {
				status = 422;
			}

			return  {
				code: status,
				response: {
					statuscode: status,
					message: response.data,
					data: response.data
				}
			};
		default:
			return null;
	}
}

module.exports = {
	getGroupRequest,
	formatResponse,
	getLoginRequest,
};