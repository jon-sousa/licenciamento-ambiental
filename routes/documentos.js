const router = require('express').Router()
const multerConfig = require('../config/multerConfig')
const passport = require('passport')
const upload = require('multer')({storage: multerConfig})
const documentoController = require('../controllers/documentoController')

router.post('/', passport.authenticate('bearer-usuario', {session: false}), upload.single('file'), documentoController.uploadDocumento)
router.get('/', passport.authenticate('bearer-usuario', {session: false}) ,documentoController.downloadDocumento)

module.exports = router