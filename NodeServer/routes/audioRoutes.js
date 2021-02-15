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
    .post(upload.single('audio'), async (req, res) => {
        try {
            // file is saved in upload.single and path is in req.file.path
            const c = req.body;
            let resDb = await ctrl.createNewAudio({
                body: {
                    username: c.username,
                    language: c.language,
                    title: c.title,
                    desc: c.desc,
                    path: req.file.path
                }
            }, res);
            //console.log(resDb);
            res.json(resDb);
        } catch (error) {
            console.log("Error adding audio to server");
        }
    })
    .get(async (req, res) => {
        try {
            const response = await ctrl.findOneAudio(req.query, res);
            //const fileResponse = await nodeFetch('http://127.0.0.1:3001/' + response.found.path);
            const readStream = fs.createReadStream(response.found.path);
            readStream.on('open', function () {
                // This just pipes the read stream to the response object (which goes to the client)
                readStream.pipe(res);
            });
            readStream.on('error', function (err) {
                res.end(err);
            });
        }
        catch (error) {
            console.log(error);
        }
    })

module.exports = router;