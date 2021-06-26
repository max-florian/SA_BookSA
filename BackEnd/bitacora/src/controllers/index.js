const db = require('../database')

async function getBitacoraBooks(req, res){
  let result = {
    code: 200,
    message: 'Registros obtenidos'
  };

  let query = 'select * from bitacora_libros inner join libros on bitacora_libros.id_libro = libros.id inner join usuarios on libros.id_editorial = usuarios.id;'

  await db.execute(query, [])
  .then(result => {  
  }).catch(e => {
    console.log(e);
    result.code = 422;
    result.message = 'Error al obtener los registros';
  })

  res.status(result.code)
  .json(result);
}

module.exports.getBitacoraBooks = getBitacoraBooks;