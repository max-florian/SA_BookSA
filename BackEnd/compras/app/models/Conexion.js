var mysql = require('mysql');

async function execute(query, params) {
	return new Promise( async ( resolve, reject ) => {
        await connection.query( query, params, ( err, rows ) => {
            if ( err )
                return reject( err );
            return resolve( rows );
        } );
    } );
}

const ejecutar = (query, params ) => {
	let response = null;
	const result = connection.query(
		query
		, params
		, function(err,res){
				if(err) {
						throw err;
						return null;
							// llamar a metodo de error
				}
				response = res;
			}
		);
	return response;
}


const connection = mysql.createConnection({
		host     : process.env.MYSQL_HOST,
		user     : process.env.MYSQL_USERNAME,
		password : process.env.MYSQL_PASSWORD,
		database : process.env.MYSQL_DATABASE,
		multipleStatements: true
});

exports.execute = execute;
