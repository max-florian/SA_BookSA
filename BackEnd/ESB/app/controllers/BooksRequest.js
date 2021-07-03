function formatGetBooksResponse(response, group) {
	let key = 'g'+group;
	let result = {
		code: response.status,
		response: {
			data: []
		}
	};
	let responseData = response.data;
	
	switch (key) {
		case "g0":
			return  {
				code: response.status,
				response: response.data
			};
		// case "g1": // Grupo 9 que no esta
		// 	return [];
		case "g2": // Grupo 10
			for (var i = 0; i < responseData.length; i++) {
				result.response.data.push({
					"id": responseData[i]._id  ,
		            "titulo": responseData[i].titulo  ,
		            "autor": ''  ,
		            "id_editorial": responseData[i].editorial  ,
		            "precio": responseData[i].precio  ,
		            "cantidad": responseData[i].stock  ,
		            "estado": 1  ,
		            "fecha_creado": ''  ,
		            "url": responseData[i].link  ,
		            "categorias": responseData[i].genero  ,
		            "editorial": responseData[i].editorial  
				});
			}
			return result;

		case "g3": //Grupo 11
			for (var i = 0; i < responseData.length; i++) {
				result.response.data.push({
					"id": responseData[i]._id  ,
		            "titulo": responseData[i].title  ,
		            "autor": responseData[i].author  ,
		            "id_editorial": 'grupo 12',
		            "precio": responseData[i].price  ,
		            "cantidad": responseData[i].units  ,
		            "estado": 1  ,
		            "fecha_creado": ''  ,
		            "url": responseData[i].coverPage  ,
		            "categorias": responseData[i].category.join()  ,
		            "editorial": 'Grupo 12'  
				});
			}
			return result;
		default:
			return null;
	}
}

module.exports = {
	formatGetBooksResponse,
};