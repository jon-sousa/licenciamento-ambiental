const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = multer.diskStorage({
    destination: function(req, file, cb){
        console.log('multer - destination')

        cb(null, path.resolve(__dirname, '..', 'public', 'uploads'))
    },
    
    filename: function(req, file, cb){
        console.log('multer - filename')

        let salt = crypto.randomBytes(32).toString('hex') + '.jpeg'
        cb(null, file.fieldname + salt)
    }
})