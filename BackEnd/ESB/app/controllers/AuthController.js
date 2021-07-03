let authConfig = require("./AuthRequest");
let connectionData = require("../conection");
let http = require('http');
let axios = require('axios')

class AuthController {
 	register = async function (req, res) {
		const {group} = req.body;
		const body = authConfig.getGroupRequest(req, group);

		let result = {
			code: 200,
			response: {
				message:''
			}
		}

		if (body == null) {
			result.code = 404;
			result.response.statuscode = 404;
			result.response.message = "Option not found"
			return result;
		}

		try {
			let url = connectionData.getUrl(group, 'register');
			console.log(url);
			await axios.post(url, body)
				.then((response) => {
					result = authConfig.formatResponse(response, group);
				}).catch((error) => {
					console.log(error);
					result = authConfig.formatResponse(error.response, group);
				})
			
		}catch (error) {
			console.log(error);
			result.code = 422;
			result.response.message = "Error al consultar";
			result.response.statuscode = 422;
			//error log
		}

		return result;
	}
}

module.exports = AuthController;
