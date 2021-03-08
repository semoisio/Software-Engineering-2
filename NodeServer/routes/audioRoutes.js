var express = require('express');
var router = express.Router();
var multer = require('multer')
let ctrl = require('../controllers/audioController');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'audio');
    },
    filename: (req, file, cb) => {
        //console.log(file);
        cb(null, file.originalname + Date.now() + ".webm");
    }
});
const upload = multer({ storage: storage });


router.route('/audio')
    .post(upload.single('audio'), (req, res) => {
        ctrl.createNewAudio(req, res);
    })
    .get(ctrl.findAudio)
    .put(ctrl.updateAudio);
    
router.route('/audio/:id')
    .delete(ctrl.deleteAudio);

module.exports = router;