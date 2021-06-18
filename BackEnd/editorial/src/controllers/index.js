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


module.exports.approve = approve;