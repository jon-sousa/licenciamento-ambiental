const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve(__dirname, '..', 'public', 'uploads'))
    },

    filename: function(req, file, cb){
        let salt = crypto.randomBytes(16)
        cb(null, file.fieldname)
    }
})