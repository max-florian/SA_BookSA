const cors = require("cors");
const express = require("express");
var bodyParser = require('body-parser');
// require('dotenv').config();
var jsonParser = bodyParser.json()

const app = express().use(cors());
const mysql = require('./database');

app.get('/api/catalogos/catalogos/generos', jsonParser, async function (req, res) {
        code = 200;
        response = {
                data: []
        }
        let editorial = await mysql.execute(`SELECT id, nombre FROM genero WHERE estado = 1 `)
                .then( result => {
                        response.data = result;
                }).catch( error => {
                        response.message = `Error al obtener generos`;
                        res.status(422).json(response);
                });

       res.status(code).json(response);
});

const port = process.env['PORT'] || 3000;

app.listen(port, () => {
        console.log("Microservicio catalogos activo en puerto = " + port);
});

app.get('/api/catalogos/catalogos/catalogo/', jsonParser, async function (req, res) {
        let {editorial, genero} = req.query;
        let code = 200;
        let response = {
                data: []
        };

        let params = [];

        let sql = `select 
                        l.*, 
                    group_concat(g.nombre) as categorias,
                    u.id as id_editorial, 
                    u.nombre as editorial
                from libros l
                join libro_generos lg
                                on l.id = lg.id_libro
                join genero g
                                on g.id = lg.id_genero
                join usuarios u
                                on u.id = l.id_editorial
                where g.estado = 1 
                        and l.estado = 1 group by l.id;`

        if (editorial !== null && !isNaN(editorial)) {
                sql += `and l.id_editorial = ? `; 
                params.push(editorial);
        }

        if (genero !== null && !isNaN(genero)) {
                sql += `and lg.id_genero = ? `;  
                params.push(genero);
        }

        await mysql.execute(sql, params)
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

app.get('/api/catalogos/catalogos/pagos/', jsonParser, async function (req, res) {
        let {editorial, genero} = req.query;
        let code = 200;
        let response = {
                data: []
        };

        let sql = `select * from metodo_pagos where estado = 1 `

        await mysql.execute(sql)
                .then( result => {
                        response.data = result;
                }).catch( error => {
                        console.log(error);
                        code = 422;
                        response.message = `Error al obtener registros`
                });

       res.status(code).json(response);
});

app.get('/api/catalogos/catalogos/envio/', jsonParser, async function (req, res) {
        let {editorial, genero} = req.query;
        let code = 200;
        let response = {
                data: []
        };

        let sql = `select * from metodo_envios where estado = 1 `

        await mysql.execute(sql)
                .then( result => {
                        response.data = result;
                }).catch( error => {
                        console.log(error);
                        code = 422;
                        response.message = `Error al obtener registros`
                });

       res.status(code).json(response);
});

app.get('/api/catalogos/paises/', jsonParser, async function (req, res) {
        let {editorial, genero} = req.query;
        let code = 200;
        let response = {
                data: []
        };

        let sql = `select * from paises where estado = 1 `

        await mysql.execute(sql)
                .then( result => {
                        response.data = result;
                }).catch( error => {
                        console.log(error);
                        code = 422;
                        response.message = `Error al obtener registros`
                });

       res.status(code).json(response);
});


module.exports = app;
