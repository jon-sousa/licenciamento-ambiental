var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
const passport = require('passport')


var indexRouter = require('./routes/index');
var usuarioRouter = require('./routes/usuarios');
var funcionarioRouter = require('./routes/funcionario');
var documentoRouter = require('./routes/documentos');
var solicitacaoRouter = require('./routes/solicitacao');

require('dotenv').config()
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())

require('./config/authStrategies')

app.use('/', indexRouter);
app.use('/usuarios', usuarioRouter);
app.use('/documentos', documentoRouter);
app.use('/funcionario', funcionarioRouter)
app.use('/solicitacao', solicitacaoRouter)

module.exports = app;
