// Methods available for basic user

const MongoClient = require('mongodb').MongoClient;
const crud = require('./crud');

var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "testicol";

const uri = "mongodb+srv://"+user+":"+pw+"@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";


module.exports = {
    createNewUser: (newUser) => {
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        return crud.createOne(client, db, collection, newUser);
    },
    findOneUser: (params) => {
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        return crud.findOne(client, db, collection, params);
    }
}
