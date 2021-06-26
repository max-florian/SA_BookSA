const cors = require("cors");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/checkout');

var app = express().use(cors());

app.use('/api/compras/store/', indexRouter);
app.use('/api/compras/store/cart', cartRouter);
app.use('/api/compras/store/order', orderRouter);

const port = process.env['PORT'] || 3000;

app.listen(port, () => {
        console.log("Microservicio store activo en puerto = " + port);
});

module.exports = app;
