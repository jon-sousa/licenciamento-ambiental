var express = require('express');
var router = express.Router();
const passport = require('passport')
const funcionarioController = require('../controllers/funcionarioController')

/* GET users listing. */
router.post('/cadastrar-funcionario', funcionarioController.cadastrarFuncionario);
router.post('/login', passport.authenticate('local-funcionario', {session: false}), funcionarioController.login)

module.exports = router;
