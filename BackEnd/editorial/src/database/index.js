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

const connection = mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
        multipleStatements: true
});

module.exports.execute = execute;
