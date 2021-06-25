const cors = require("cors");
const express = require("express");
var bodyParser = require('body-parser');
require('dotenv').config();
var jsonParser = bodyParser.json()

const app = express().use(cors());
const mysql = require('./database');

app.put('/api/editbooks/books/:idLibro', jsonParser, async function (req, res) {
        let {autor, precio, cantidad, generos} = req.body;
        let idLibro = req.params.idLibro
        let code = 200;
        let response = {
                message: ''
        };

        if (idLibro === undefined) {
                code  = 404;
                response.message = `Not Found`;
                res.status(code).json(response);
        }

        if (autor == undefined || precio === undefined || cantidad === undefined || generos === undefined) {
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

        const updateProduct = {
                autor: autor,
                precio: Number(precio),
                cantidad: Number(cantidad)
        }

        await mysql.execute('UPDATE libros SET ? WHERE  id = ?', [updateProduct, idLibro])
                .then( result => {
                        
                }).catch( error => {
                        console.log(error);
                        code = 422;
                        response.message = `Error al insertar registro`
                });

        let genQuery = `DELETE FROM libro_generos where  id_libro = ${idLibro};`;
        for (var i = 0; i < generos.length; i++) {
                genQuery += `INSERT INTO libro_generos values ( ${idLibro}, ?);`
        }

        await mysql.execute(genQuery,generos)
                .then( result => {
                        response.message = `Libro modificado correctamete`;
                }).catch( error => {
                        console.log(error);
                        response.message = `Problema al guardar generos de libro`;
                        res.status(400).json(response);
                });

        let queryBitacora = 'insert into bitacora_libros (id_libro, accion) values (?,"editar")'
        await mysql.execute(queryBitacora,[idLibro])
                .then( result => {}).catch( error => { console.log(error);});


       res.status(code).json(response);
});

const port = process.env['PORT'] || 3002;

app.listen(port, () => {
        console.log("Microservicio editar libro activo en puerto = " + port);
});

module.exports = app;
