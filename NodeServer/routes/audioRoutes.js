var express = require('express');
var router = express.Router();
var multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'audio');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname + Date.now() + ".webm");
    }
});
const upload = multer({ storage: storage });
//let ctrl = require('../controllers/audioController');

router.route('/audio')
    .post(upload.single('audio'), (req, res) => {
        try {
            res.send(req.file);
        } catch (err) {
            console.log(err);
            res.send(400);
        }
    });

module.exports = router;