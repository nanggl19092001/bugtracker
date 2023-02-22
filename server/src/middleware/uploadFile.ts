const multer = require('multer')

const path = require('path')

const storage = multer.diskStorage({
    destination: function(req: any, file: any, cb: any){

        cb(null, path.join(__dirname, '../../public'))
    }
})

const upload = multer({storage: storage})

module.exports = upload