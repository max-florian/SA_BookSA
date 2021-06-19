const db = require('../database')

async function approve(req, res){
  const {token, id_editorial} = req.body;

  let result = {
    code: 200,
    message: 'Registro actualizado'
  };

  if(id_editorial == undefined){
    result.message = 'Campos faltantes';
    res.status(result.code).json(result);
  }

  let query = 'UPDATE usuarios SET estado = 1 WHERE id = ?';

  await db.execute(query, [id_editorial])
  .then(result => {  
  }).catch(e => {
    console.log(e);
    result.code = 422;
    result.message = 'Error al actualizar el registro';
  })

  res.status(result.code)
  .json(result);
}

async function getUsers(req, res){
  const {token} = req.body;

  let result = {
    code: 200,
    message: 'Usuarios'
  };

  let query = 'SELECT * FROM usuarios WHERE tipo != "admin" && estado != 0 ORDER BY tipo, nombre;;';

  await db.execute(query, [])
  .then(rows => {  
    result.data = rows;
  }).catch(e => {
    console.log(e);
    result.code = 422;
    result.message = 'Error al obtener usuarios';
  })

  res.status(result.code)
  .json(result);
}

async function deleteUser(req, res){
  const {id_user} = req.params;

  let result = {
    code: 200,
    message: 'Registro eliminado'
  };

  if(id_user == undefined){
    result.message = 'Campos faltantes';
    res.status(result.code).json(result);
  }

  let query = 'UPDATE usuarios SET estado = 0 WHERE id = ?';

  await db.execute(query, [id_user])
  .then(result => {  
  }).catch(e => {
    console.log(e);
    result.code = 422;
    result.message = 'Error al eliminar el registro';
  })

  res.status(result.code)
  .json(result);
}

module.exports.approve = approve;
module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;