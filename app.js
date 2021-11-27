var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')


var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var funcionarioRouter = require('./routes/funcionario');
var documentosRouter = require('./routes/documentos');

require('dotenv').config()
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
require('./config/authStrategies')

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/documentos', documentosRouter);
app.use('/funcionario', funcionarioRouter)

module.exports = app;
