const Blob = require('node-blob');

module.exports = {
    createNewAudio: async (req, res) => {
        try {
            let myBlob = new Blob(req.body);
            console.log(myBlob);
        }
        catch (error) {
            console.log(error)
        }
    }
}


/** When using the "single"
                data come in "req.file" regardless of the attribute "name". **/
                //var tmp_path = req.file.path;

/** The original name of the uploaded file
    stored in the variable "originalname". **/
                //var target_path = 'uploads/' + req.file.originalname;
/*
            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            src.on('end', function () { res.render('complete'); });
            src.on('error', function (err) { res.render('error'); });
            */
