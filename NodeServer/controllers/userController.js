// Methods available for basic user

const MongoClient = require('mongodb').MongoClient;
const crud = require('../database/crud');
const bcrypt = require('bcrypt');
var email = require('../tools/email');
var ObjectId = require('mongodb').ObjectID;

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
                            status: "",
                            rptoken: "",
                            rpexpires: ""
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
    findUser: async (req, res) => {
        try {
            const client1 = new MongoClient(uri, { useUnifiedTopology: true });
            // if username dont came with query send error
            if (req.query.username === undefined || req.query.username === "") {
                res.json({ status: "NOT OK", msg: "Use username to find user" });
            }

            const user = await crud.findOne(client1, db, collection, req.query)

            if (user) {
                res.json({ status: "OK", found: user });
            }
            else {
                res.json({ status: "NOT OK", msg: "Did not find user" });
            }

        }
        catch (error) {

            res.json({ status: "NOT OK", msg: "Error finding user" });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const client1 = new MongoClient(uri, { useUnifiedTopology: true });
            // if username dont came with query send error
            const c = req.params;
            if (!c.id) {
                res.json({ status: "NOT OK", msg: "Give id" });
            }

            const deleted = await crud.deleteOne(client1, db, collection, { "_id": new ObjectId(c.id) });
            if (deleted > 0) {
                res.json({ status: "OK", msg: "User deleted succesfully" });
            }
            else {
                res.json({ status: "NOT OK", msg: "Did not delete user" });
            }
        }
        catch (error) {

            res.json({ status: "NOT OK", msg: "Error finding user" });
        }
    },
    updateUser: async (req, res) => {
        let c = req.body;
        try {
            const client1 = new MongoClient(uri, { useUnifiedTopology: true });
            const client2 = new MongoClient(uri, { useUnifiedTopology: true });
            // if username dont came with query send error
            if (!c._id || !c.username ) {
                res.json({ status: "NOT OK", msg: "Check body, fields missing" });
            }

            //const checkName = await crud.findOne(client2, db, collection, { username: c.username });

            // if (!checkName) {
            //     res.json({ status: "NOT OK", msg: "Username not found" });
            // }else{
            //     //If password changed need to hash new password
            //     if (!bcrypt.compareSync(c.password, checkName.password)) {
            //         const hashed = await bcrypt.hash(c.password, 10);
            //         c.password = hashed;   
            //     }
            // }
            if (c.password){
                const hashed = await bcrypt.hash(c.password, 10);
                c.password = hashed;
            }
            
            let id = new ObjectId(c._id); // id of the audio in mongodb
            delete c._id; // remove id from update json
            const updated = await crud.updateOneUser(client1, db, collection, { "_id": id}, c);
            if (updated > 0) {
                res.json({ status: "OK", msg: "User update succesfully" });
            }
            else {
                res.json({ status: "NOT OK", msg: "Did not update user" });
            }
        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Error finding user" });
        }
    }
    /*
    findOneUser: async (params) => {
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        return await crud.findOne(client, db, collection, params);
    },


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
            res.json({ status: "NOT OK", msg: "Tilanne eritt??in SOS" });
        }


    }*/
}
