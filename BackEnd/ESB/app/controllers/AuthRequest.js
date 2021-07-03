function  getGroupRequest(req, group) {
	const { name, lastname, email, password, status, phone, type } = req.body;
	switch (group) {
		case 0:
			return req.body;
		case 1: // Grupo 9 que no esta
			return [];
		case 2: // Grupo 10
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
		case 3: //Grupo 11
			let rolId = type ==='cliente'? 3:2
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
	switch (group) {
		case 0:
			return req.body;
		case 1: // Grupo 9 que no esta
			return [];
		case 2: // Grupo 10
			return req.body
		case 3: //Grupo 11
			return {
				"user": email,
				"password": password
			}
		default:
			return null;
	}
}

function formatResponse(response, group) {
	switch (group) {
		case 0:
			return  {
				code: response.status,
				response: response.data
			};
		// case 1: // Grupo 9 que no esta
		// 	return [];
		case 2: // Grupo 10
			return  {
				code: response.status,
				response: {
					statuscode: response.status,
					data: response.data
				}
			};
		case 3: //Grupo 11
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