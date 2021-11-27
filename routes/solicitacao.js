const router = require('express').Router()
const multerConfig = require('../config/multerConfig')
const passport = require('passport')
const upload = require('multer')({storage: multerConfig})
const solicitacaoController = require('../controllers/solicitacaoController')

router.post('/cadastrar-solicitacao', passport.authenticate('bearer-usuario', {session: false}), upload.single('file'), solicitacaoController.cadastrarSolicitacao)

module.exports = router