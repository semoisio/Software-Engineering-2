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
                
                // checks if username exists
                if (!checkName) {
                    res.json({ status: "NOT OK", msg: "Username not found" });
                }
                else {
                    if(checkName.status=='confirmed'){
                        // decrypts stored password and compares it to the input
                        if (!bcrypt.compareSync(req.query.password, checkName.password)) {
                            res.json({ status: "NOT OK", msg: "Password incorrect" });
                        }
                        else {
                            res.json({ status: "OK", msg: "Login successful" });
                        }
                    }
                    res.json({ status: "NOT OK", msg: "Email hasnt been confirmed yet" });
                     
                    
                }

            }

        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Tilanne erittäin SOS" });
        }


    },
    updatePassword: async (req, res) => {
        let c = req.body;
        
        try {
            

            if (!c.rptoken) {
                res.json({ status: "NOT OK", msg: "token not found" });
            }
            else {
                if (c.password) {
                    const hashed = await bcrypt.hash(c.password, 10);
                    c.password = hashed;
                    
                }

                let token = (c.rptoken);
                const client1 = new MongoClient(uri, { useUnifiedTopology: true });
                const updated = await crud.updateOneUser(client1, db, collection, { "rptoken": token }, c);
                if (updated > 0) {
                    res.json({ status: "OK", msg: "Password updated succesfully" });
                }
                else {
                    res.json({ status: "NOT OK", msg: "Could not update password" });
                }
            }
        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Error finding user" });
        }
    }
}