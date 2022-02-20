const router = require('express').Router()
const multerConfig = require('../config/multerConfig')
const passport = require('passport')
const upload = require('multer')({storage: multerConfig})
const solicitacaoController = require('../controllers/solicitacaoController')

router.post('/cadastrar-solicitacao', passport.authenticate('bearer-usuario', {session: false}), upload.array('files'), solicitacaoController.cadastrarSolicitacao)
router.get('/consultar-solicitacoes-por-usuario', passport.authenticate('bearer-usuario', {session: false}), solicitacaoController.consultaSolicitacoesPorUsuario)

module.exports = router