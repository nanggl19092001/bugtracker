"use strict";
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
    },
    filename: function (req, res, cb) {
    }
});
const upload = multer({ storage: storage });
module.exports = upload;
