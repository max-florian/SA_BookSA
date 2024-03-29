const cors = require("cors");
const express = require("express");
var bodyParser = require('body-parser');
require('dotenv').config();
var jsonParser = bodyParser.json()

const app = express().use(cors());
const mysql = require('./database');

app.post('/api/addbooks/add_book', jsonParser, async function (req, res) {
        let {titulo, autor, precio, cantidad, generos, idEditorial} = req.body;
        let code = 200;
        let response = {
                message: ''
        };

        if (titulo  == undefined || autor == undefined || precio === undefined || cantidad === undefined || idEditorial === undefined || generos === undefined) {
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

        const new_product = {
                titulo: titulo,
                autor: autor,
                precio: Number(precio),
                cantidad: Number(cantidad),
                id_editorial: Number(idEditorial)
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
                        response.message = `${titulo} agregado correctamete`;
                }).catch( error => {
                        console.log(error);
                        response.message = `Problema al guardar generos de libro`;
                        res.status(400).json(response);
                });


        let queryBitacora = 'insert into bitacora_libros (id_libro, accion) values (?,"crear")'
        await mysql.execute(queryBitacora,[id])
                .then( result => {}).catch( error => { console.log(error);});


       res.status(code).json(response);
});

const port = process.env['PORT'] || 3001;

app.listen(port, () => {
        console.log("Microservicio agregar libro activo en puerto = " + port);
});

module.exports = app;
