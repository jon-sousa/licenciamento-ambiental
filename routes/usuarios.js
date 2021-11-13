var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/usuarioController')

/* GET users listing. */
router.post('/cadastrar-usuario', usuarioController.cadastrarUsuario);

module.exports = router;
