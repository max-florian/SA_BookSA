const cors = require("cors");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var session = require('express-session')

var authRouter = require('./routes/auth');
var booksRouter = require('./routes/books');
// var storeRouter = require('./routes/store');

var app = express().use(cors());

app.use('/api/esb/auth', authRouter);
app.use('/api/esb/books', booksRouter);
// app.use('/api/esb/store', storeRouter);

const port = process.env['PORT'] || 3009;

app.listen(port, () => {
    console.log("ESB arriba en puerto " + port);
});

module.exports = app;
