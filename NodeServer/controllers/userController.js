// Methods available for basic user

const MongoClient = require('mongodb').MongoClient;
const crud = require('../database/crud');

var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "testicol";

const uri = "mongodb+srv://"+user+":"+pw+"@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";


module.exports = {
    createNewUser: async (req, res) => {
        
        try {
            // Check if the name is already in use
            const client1 = new MongoClient(uri, { useUnifiedTopology: true });
            const checkName = await crud.findOne(client1, db, collection, {name: req.body.name});
            if (checkName) {
                res.json({ status: "NOT OK", msg: "Username is already in use" });
            }
            else {
                const client2 = new MongoClient(uri, { useUnifiedTopology: true });
                const added = await crud.createOne(client2, db, collection, req.body);
                if (added) {
                    res.json({ status: "OK", added: added});
                }
                else {
                    res.json({ status: "NOT OK", msg: "Error adding user" });
                }
            }
        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Error adding user" });
        }
    },
    findOneUser: async (params) => {
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        return await crud.findOne(client, db, collection, params);
    }
}
