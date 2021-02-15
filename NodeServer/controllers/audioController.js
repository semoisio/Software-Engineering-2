const MongoClient = require('mongodb').MongoClient;
const crud = require('../database/crud');


var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "audiocol";

const uri = "mongodb+srv://" + user + ":" + pw + "@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";


module.exports = {
    createNewAudio: async (req, res) => {
        try {
            const c = req.body;
            // check that fields are not empty
            if (!c.username || !c.language || !c.title || !c.desc || !c.path) {
                return { status: "NOT OK", msg: "Check fields" };
            }
            else {
                const client1 = new MongoClient(uri, { useUnifiedTopology: true });
                const newAudio = await crud.createOne(client1, db, collection, {
                    username: c.username,
                    language: c.language,
                    title: c.title,
                    desc: c.desc,
                    path: c.path
                });
                if (newAudio) {
                    return { status: "OK", added: newAudio };
                }
                else {
                    return { status: "NOT OK", msg: "Error adding audio to db" };
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    findOneAudio: async (req, res) => {
        try {
            const c = req;
            if (!c.title) {
                return ({ status: "NOT OK", msg: "Give title" });
            }
            else {
                const client = new MongoClient(uri, { useUnifiedTopology: true });
                const audio = await crud.findOne(client, db, collection, { title: c.title });
                if (audio) {
                    return ({ status: "OK", found: audio });
                }
                else {
                    return ({ status: "NOT OK", msg: "Did not find audio" });
                }
            }
        }
        catch (error) {
            console.log(error);
            return ({ status: "NOT OK", msg: "Error getting audio" });
        }
    }
}

