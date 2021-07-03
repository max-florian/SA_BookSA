let booksConfig = require("./BooksRequest");
let connectionData = require("../conection");
let http = require('http');
let axios = require('axios')

class BooksController {
 	getBooks = async function (req, res) {
		const {group} = req.query;

		let result = {
			code: 200,
			response: {
				data:[]
			}
		}

		try {
			let url = connectionData.getUrl(group, 'getBooks');
			await axios.get(url, null, req.params)
				.then((response) => {
					result = booksConfig.formatGetBooksResponse(response, group);
				}).catch((error) => {
					console.log(error);
					result = booksConfig.formatGetBooksResponse(error.response, group);
				})
			
		}catch (error) {
			console.log(error);
			result.code = 422;
			result.response.message = "Error al consultar";
			result.response.statuscode = 422;
		}
		console.log(result);
		return result;
	}


	login = async function (req, res) {
		const {group} = req.body;
		const body = booksConfig.getLoginRequest(req, group);

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
			let url = connectionData.getUrl(group, 'login');
			await axios.post(url, body)
				.then((response) => {
					result = booksConfig.formatResponse(response, group);
				}).catch((error) => {
					console.log(error);
					result = booksConfig.formatResponse(error.response, group);
				})
			
		}catch (error) {
			console.log(error);
			result.code = 422;
			result.response.message = "Error al consultar";
			result.response.statuscode = 422;
		}

		return result;
	}
}

module.exports = BooksController;
