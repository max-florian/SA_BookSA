const cors = require("cors");
const express = require("express");
var bodyParser = require('body-parser');
require('dotenv').config();  
var jsonParser = bodyParser.json()

const app = express().use(cors());
const mysql = require('./database');

app.get('/api/viewbooks/books/', jsonParser, async function (req, res) {
        let {idEditorial} = req.query;
        let code = 200;
        let response = {
                data: []
        };

        let sql = `select l.*, group_concat(g.nombre) as categorias,
                        date_format(l.fecha_creado,"%d/%m/%Y %H:%i:%s") as fecha_creado
                from libros l
                join libro_generos lg
                        on l.id = lg.id_libro
                join genero g
                        on g.id = lg.id_genero
                where g.estado = 1
                and l.estado = 1
                and l.id_editorial = ?
                group by l.id;`

        await mysql.execute(sql, [idEditorial])
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

app.get('/api/viewbooks/books/:idLibro', jsonParser, async function (req, res) {
        let {idLibro}=req.params;
        let code = 200;
        let response = {
                data: [],
                generos: []
        };

        await mysql.execute(`select * from libros where id  = ?`, [idLibro])
                .then( result => {
                        response.data = result;
                }).catch( error => {
                        code = 422;
                        response.message = `Error al obtener registros`
                });

        let sqlGeneros = `select g.* 
                from libro_generos lg
                join genero g
                        on g.id = lg.id_genero
                where g.estado = 1
                and lg.id_libro = ?`;

        await mysql.execute(sqlGeneros, [idLibro])
                .then( result => {
                        response.generos = result
                }).catch( error => {
                        code = 422;
                        response.message = `Error al obtener generos`
                });

       res.status(code).json(response);
});

app.delete('/api/viewbooks/books/:idLibro', jsonParser, async function (req, res) {
        let {idLibro}=req.params;
        let code = 200;
        let response = {
                message: ''
        };

        await mysql.execute(`update libros set estado = 0 where id  = ?`, [idLibro])
                .then( result => {
                        response.message = 'Libro eliminado con exito';
                }).catch( error => {
                        code = 422;
                        response.message = `Error al eliminar libro`
                });

        let queryBitacora = 'insert into bitacora_libros (id_libro, accion) values (?,"eliminar")';
        await mysql.execute(queryBitacora,[idLibro])
                .then( result => {}).catch( error => { console.log(error);});

       res.status(code).json(response);
});


const port = process.env['PORT'] || 3003;

app.listen(port, () => {
        console.log("Microservicio ver libro(s) activo en puerto = " + port);
});

module.exports = app;
