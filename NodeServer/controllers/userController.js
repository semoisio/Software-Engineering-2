// Methods available for basic user

const MongoClient = require('mongodb').MongoClient;
const crud = require('../database/crud');
const bcrypt = require('bcrypt');
var email = require('../tools/email');

var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "usercol";

const uri = "mongodb+srv://" + user + ":" + pw + "@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";


module.exports = {
    // create new user with username, password, email, learning
    createNewUser: async (req, res) => {
        try {
            const c = req.body;
            // check that fields are not empty
            if (!c.username || !c.password || !c.email || !c.learning) {
                res.json({ status: "NOT OK", msg: "Check fields" });
            }
            else {
                const client1 = new MongoClient(uri, { useUnifiedTopology: true });
                // Check if the username is already in use
                const checkName = await crud.findOne(client1, db, collection, { username: c.username });
                if (checkName) {
                    res.json({ status: "NOT OK", msg: "Username is already in use" });
                }
                else {
                    // Check if the email is already in use
                    const client3 = new MongoClient(uri, { useUnifiedTopology: true });
                    const checkEmail = await crud.findOne(client3, db, collection, { email: c.email });
                    if (checkEmail) {
                        res.json({ status: "NOT OK", msg: "Email is already in use" });
                    }
                    else {
                        // create hashed password
                        const hashed = await bcrypt.hash(c.password, 10);
                        // create new user
                        const newUser = { 
                            username: c.username, 
                            password: hashed, 
                            email: c.email, 
                            learning: c.learning,
                            status: "" 
                        };
                        // add user to db
                        const client2 = new MongoClient(uri, { useUnifiedTopology: true });
                        const added = await crud.createOne(client2, db, collection, newUser);
                        if (added) {
                            // send confirmation link
                            email.sendMail(added[0].email, added[0]._id)
                            .then(() => res.json({ status: "OK", added: added }));
                        }
                        else {
                            res.json({ status: "NOT OK", msg: "Error adding user" });
                        }
                    }
                }
            }
        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Error adding user" });
        }
    },

    /*
    findOneUser: async (params) => {
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        return await crud.findOne(client, db, collection, params);
    },*/


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
