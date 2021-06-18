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
        host     : process.env.MYSQL_HOST,
        user     : process.env.MYSQL_USERNAME,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE,
        multipleStatements: true
});

// const connection = mysql.createConnection({
//         host     : 'sadatabase.c1fhm8nxvuiq.us-east-2.rds.amazonaws.com',
//         user     : 'admin',
//         password : 'Abc123!!',
//         database : 'booksa',
//         multipleStatements: true
// });


exports.execute = execute;
