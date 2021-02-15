const MongoClient = require('mongodb').MongoClient;
const crud = require('../database/crud');
const fs = require('fs');

var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "audiocol";

const uri = "mongodb+srv://" + user + ":" + pw + "@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";

const createStream = (path, res) => {
    try {
        const readStream = fs.createReadStream(path);
        readStream.on('open', function () {
            readStream.pipe(res);
        });
        readStream.on('error', function (err) {
            res.send(err);
        });
    }
    catch (error) {
        console.log(error);
    }
}

const fileToClient = async (req, res) => {
    try {
        const c = req.query;
        if (!c.title) {
            res.json({ status: "NOT OK", msg: "Give title" });
        }
        else {
            const client = new MongoClient(uri, { useUnifiedTopology: true });
            const audio = await crud.findOne(client, db, collection, { title: c.title });
            if (audio) {
                createStream(audio.path, res);
            }
            else {
                res.json({ status: "NOT OK", msg: "Did not find audio" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.json({ status: "NOT OK", msg: "Error getting audio" });
    }
}

const searchAudio = async (req, res) => {
    try {
    const client1 = new MongoClient(uri, { useUnifiedTopology: true });
    const audio = await crud.findMany(client1, db, collection, req.query);
    if (audio) {
        res.json({ status: "OK", found: audio });
    }
    else {
        res.json({ status: "NOT OK", msg: "Did not find audio" });
    }
    }
    catch (error) {
        console.log("Error searching for audio");
    }
}

module.exports = {
    createNewAudio: async (req, res) => {
        try {
            // file is saved in upload.single and path is in req.file.path
            const c = req.body;
            // check that fields are not empty
            if (!c.username || !c.language || !c.title || !c.desc || !req.file.path) {
                return { status: "NOT OK", msg: "Check fields" };
            }
            else {
                const client1 = new MongoClient(uri, { useUnifiedTopology: true });
                const newAudio = await crud.createOne(client1, db, collection, {
                    username: c.username,
                    language: c.language,
                    title: c.title,
                    desc: c.desc,
                    path: req.file.path
                });
                if (newAudio) {
                    res.json({ status: "OK", added: newAudio });
                }
                else {
                    res.json({ status: "NOT OK", msg: "Error adding audio to db" });
                }
            }
        } catch (error) {
            console.log("Error adding audio to server");
        }
    },

    findAudio: async (req, res) => {
        if (req.query.file === "true") {
            fileToClient(req, res);
        }
        else {
            searchAudio(req, res);
        }
    }
}

