const MongoClient = require('mongodb').MongoClient;
const crud = require('../database/crud');
const fs = require('fs');
var ObjectId = require('mongodb').ObjectID;

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
        console.log("Error creating stream");
    }
};

// find file from server and create readable stream to client
const fileToClient = async (req, res) => {
    try {
        const c = req.query;
        if (!c.id) {
            res.json({ status: "NOT OK", msg: "Give title" });
        }
        else {
            const client = new MongoClient(uri, { useUnifiedTopology: true });
            const audio = await crud.findOne(client, db, collection, { "_id": new ObjectId(c.id) });
            if (audio) {
                createStream(audio.path, res);
            }
            else {
                res.json({ status: "NOT OK", msg: "Did not find audio" });
            }
        }
    }
    catch (error) {
        res.json({ status: "NOT OK", msg: "Error getting audio" });
    }
};

// search audio
const searchAudio = async (req, res) => {
    try {
        const client1 = new MongoClient(uri, { useUnifiedTopology: true });
        let q = req.query;
        if (Object.keys(q).length >= 0) {
            if (q.title !== undefined) {
                q.title = new RegExp(q.title);
            }
            const audio = await crud.findMany(client1, db, collection, q);
            if (audio) {
                res.json({ status: "OK", found: audio });
            }
            else {
                res.json({ status: "NOT OK", msg: "Did not find audio" });
            }
        }
        else {
            res.json({ status: "NOT OK", msg: "Check query" });
        }
    }
    catch (error) {
        console.log("Error searching for audio");
    }
};

// delete audio by id from server and db
const deleteAudio = async (req, res) => {
    const c = req.params;
    if (!c.id) {
        res.json({ status: "NOT OK", msg: "Give id" });
    }
    else {
        try {
            const client1 = new MongoClient(uri, { useUnifiedTopology: true });
            const client2 = new MongoClient(uri, { useUnifiedTopology: true });

            const audio = await crud.findOne(client1, db, collection, { "_id": new ObjectId(c.id) });
            if (audio) {
                // delete audio from server
                fs.unlink(audio.path, async (err) => {
                    if (err) {
                        res.json({ status: "NOT OK", msg: "Error deleting audio" });
                    }
                    else {
                        // delete audio from db
                        const deleted = await crud.deleteOne(client2, db, collection, { "_id": new ObjectId(c.id) });
                        if (deleted > 0) {
                            res.json({ status: "OK" });
                        }
                        else {
                            res.json({ status: "NOT OK", msg: "Did not delete audio" });
                        }
                    }
                })
            }
            else {
                res.json({ status: "NOT OK", msg: "Did not find audio" });
            }
        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Error deleting audio" });
        }
    }
};

// update audio info
const updateAudio = async (req, res) => {
    let c = req.body;
    console.log(c);
    if (!c._id) {
        res.json({ status: "NOT OK", msg: "Check fields" });
    }
    else {
        try {
            let id = new ObjectId(c._id); // id of the audio in mongodb
            delete c._id; // remove id from update json
            const client1 = new MongoClient(uri, { useUnifiedTopology: true });
            const updated = await crud.updateOne(client1, db, collection, { "_id": id }, c);
            if (updated > 0) {
                res.json({ status: "OK" });
            }
            else {
                res.json({ status: "NOT OK", msg: "Did not update audio" });
            }
        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Error updating audio" });
        }
    }
}

module.exports = {
    createNewAudio: async (req, res) => {
        try {
            // file is saved in upload.single and path is in req.file.path
            const c = req.body;
            // check that fields are not empty
            if (!c.username || !c.language || !c.title || !c.desc || !c.genre || !c.difficulty || !req.file.path) {
                return { status: "NOT OK", msg: "Check fields" };
            }
            else {
                const client1 = new MongoClient(uri, { useUnifiedTopology: true });
                const newAudio = await crud.createOne(client1, db, collection, {
                    username: c.username,
                    language: c.language,
                    title: c.title,
                    desc: c.desc,
                    genre: c.genre,
                    difficulty: c.difficulty,
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
    },

    deleteAudio: deleteAudio,
    updateAudio: updateAudio
}

