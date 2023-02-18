const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req: any, res: any, cb: any){

    },
    filename: function(req: any, res: any, cb: any){

    }
})

const upload = multer({storage: storage})

module.exports = upload