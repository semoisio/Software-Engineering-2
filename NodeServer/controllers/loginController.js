const MongoClient = require('mongodb').MongoClient;
const crud = require('../database/crud');
const bcrypt = require('bcrypt');

var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "usercol";

const uri = "mongodb+srv://" + user + ":" + pw + "@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";


module.exports = {
    loginUser: async (req, res) => {

        try {
            // checks that fields are not empty
            if (!req.query.username || !req.query.password) {
                res.json({ status: "NOT OK", msg: "--Check fields--" });
                console.log("check fields")
            } else {
                // finds user based on username
                const client = new MongoClient(uri, { useUnifiedTopology: true });
                const checkName = await crud.findOne(client, db, collection, { username: req.query.username });
                console.log(checkName)
                // checks if username exists
                if (!checkName) {
                    res.json({ status: "NOT OK", msg: "Username not found" });
                }
                else {
                    // decrypts stored password and compares it to the input 
                    if (!bcrypt.compareSync(req.query.password, checkName.password)) {
                        res.json({ status: "NOT OK", msg: "Password incorrect" });
                    }
                    else {
                        res.json({ status: "OK", msg: "Login successful" });
                    }
                }

            }

        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Tilanne erittäin SOS" });
        }


    }
}