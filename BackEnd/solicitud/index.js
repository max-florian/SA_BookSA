const cors = require("cors");
const express = require("express");
var bodyParser = require('body-parser');
require('dotenv').config();
var jsonParser = bodyParser.json();

const app = express().use(cors());
const mysql = require('./database');

app.use(express.urlencoded());
app.use(express.json());

app.post('/api/solicitud/add', async function (req, res) {
        let {titulo, autor, generos, url} = req.body;
        let code = 200;
        let response = {
                message: ''
        };

        if (titulo  == undefined || autor == undefined || generos === undefined) {
                code  = 422;
                response.message = `Por favor revise los campos faltantes`;
                res.status(code).json(response);
        }

        if (generos.constructor !== Array) {
                code  = 422;
                response.message = `Generos incorrectos`;
                res.status(code).json(response);
        }

        if (generos.length === 0) {
                code  = 422;
                response.message = `Debe escoger al menos un  genero`;
                res.status(code).json(response);
        }

        const new_product = {
                titulo: titulo,
                autor: autor,
                url: url,
                estado: '2'
        }

        await mysql.execute('INSERT INTO libros SET ?', [new_product])
                .then( result => {
                        
                }).catch( error => {
                        console.log(error);
                        code = 422;
                        response.message = `Error al insertar registro`
                });

        let id = 0;
        await mysql.execute(`SELECT last_insert_id() as id;`,[])
                .then( result => {
                        id = result[0]['id'];
                }).catch( error => {
                        response.message = `Problema al guardar los generos de libro`;
                        res.status(400).json(response);
                });

        let genQuery = '';
        for (var i = 0; i < generos.length; i++) {
                genQuery += `INSERT INTO libro_generos values(${id}, ?);`
        }

        await mysql.execute(genQuery,generos)
                .then( result => {
                        response.message = `Solicitud de ${titulo} agregada correctamete`;
                }).catch( error => {
                        console.log(error);
                        response.message = `Problema al guardar generos de libro`;
                        res.status(400).json(response);
                });

       res.status(code).json(response);
});

app.get('/api/solicitud/', async function (req, res) {
        let code = 200;
        let response = {
                message: '',
                data:[]
        };

        let sql = `select l.*, group_concat(g.nombre) as categorias,
                        date_format(l.fecha_creado,"%d/%m/%Y %H:%i:%s") as fecha_creado
                from libros l
                join libro_generos lg
                        on l.id = lg.id_libro
                join genero g
                        on g.id = lg.id_genero
                where g.estado = 1
                and l.estado = 2
                group by l.id;`

        await mysql.execute(sql, [])
                .then( result => {
                        if(result.length > 0 && result[0]['id'] !== null){
                                response.data = result;
                        }
                }).catch( error => {
                        console.log(error);
                        code = 422;
                        response.message = `Error al obtener registros`
                });

       res.status(code).json(response);
});

app.patch('/api/solicitud/aprobar/:idLibro', async function (req, res) {
        let {precio, cantidad, idEditorial} = req.body;
        let {idLibro} = req.params;
        let code = 200;
        let response = {
                message: ''
        };

        if (precio  == undefined || cantidad == undefined || idLibro == undefined || idEditorial == undefined) {
                code  = 422;
                response.message = `Por favor revise los campos faltantes`;
                res.status(code).json(response);
        }

        if (isNaN(idEditorial) ) {
                code  = 422;
                response.message = `Usuario Inválido`;
                res.status(code).json(response);
        }

        if (isNaN(precio) || isNaN(cantidad)) {
                code  = 422;
                response.message = `La cantidad y el precio deben ser un valor numerico`;
                res.status(code).json(response);
        }

        precio = Number(precio);
        cantidad = Number(cantidad);

        if (precio <= 0) {
                code  = 422;
                response.message = `El precio debe ser mayor a 0`;
                res.status(code).json(response);
        }

        if (cantidad <= 0) {
                code  = 422;
                response.message = `La cantidad debe ser mayor a 0`;
                res.status(code).json(response);
        }

        let editorial = await mysql.execute(`SELECT id FROM usuarios WHERE id = ${idEditorial} and tipo = "editorial"`)
                .then( result => {
                        if (result.length === 0) {
                                response.message = `Usuario incorrecto`;
                                res.status(422).json(response);
                        };
                }).catch( error => {
                        response.message = `Usuario incorrecto`;
                        res.status(422).json(response);
                });

        const update_product = {
                precio: precio,
                cantidad: cantidad,
                id_editorial: idEditorial,
                estado: 1
        }

        await mysql.execute('UPDATE libros SET ? WHERE id = ? AND estado = 2', [update_product, idLibro])
                .then( result => {
                        response.message = `Solicitud aprobada correctamete`;
                }).catch( error => {
                        console.log(error);
                        code = 422;
                        response.message = `Error al insertar registro`
                });

        let queryBitacora = 'insert into bitacora_libros (id_libro, accion) values (?,"aprobar solicitud")'
        await mysql.execute(queryBitacora,[idLibro])
                .then( result => {}).catch( error => { console.log(error);});

       res.status(code).json(response);
});




const port = process.env['PORT'] || 3008;

app.listen(port, () => {
        console.log("Microservicio solicitud activo en puerto = " + port);
});

module.exports = app;
