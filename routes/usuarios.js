var express = require('express');
var router = express.Router();
const passport = require('passport')
const usuarioController = require('../controllers/usuarioController')

/* GET users listing. */
router.post('/cadastrar-usuario', passport.authenticate('bearer-usuario', {session: false}) ,usuarioController.cadastrarUsuario);
router.post('/login', passport.authenticate('local-usuario', {session: false}), usuarioController.login)

module.exports = router;
