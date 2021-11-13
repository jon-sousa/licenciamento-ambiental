const router = require('express').Router()
const multerConfig = require('../config/multerConfig')
const upload = require('multer')({storage: multerConfig})
const documentoController = require('../controllers/documentoController')

router.post('/', upload.single('file'), documentoController.uploadDocumento)
router.get('/', documentoController.downloadDocumento)

module.exports = router