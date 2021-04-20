const crud = require('../database/crud');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var email = require('../tools/emailreset');


var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "usercol";

const uri = "mongodb+srv://" + user + ":" + pw + "@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
    emailReset: async (req, res) => {
        let c = req.body;

        try {
            // checks that fields are not empty
            if (!c.email) {
                res.json({ status: "NOT OK", msg: "--Check fields--" });
                console.log("check fields")
            } else {
                // finds email based on given email
                const client = new MongoClient(uri, { useUnifiedTopology: true });
                const checkEmail = await crud.findOne(client, db, collection, { email: c.email });

                // checks if email exists
                if (!checkEmail) {
                    res.json({ status: "NOT OK", msg: "Email does not exist" });
                }
                else {
                    //const token = crypto.randomBytes(20).toString('hex');
                    //const expires = Date.now() + 3600000;

                    let id = new ObjectId(checkEmail._id);

                    const client1 = new MongoClient(uri, { useUnifiedTopology: true });
                    const updated = await crud.updateOne(client1, db, collection, { "_id": id }, c);
                    if (updated > 0) {

                        email.sendresetMail(c.email, c.rptoken)
                            .then(() => res.json({ status: "OK", checkEmail: checkEmail }));
                        

                    }
                    else {
                        res.json({ status: "NOT OK", msg: "Could not update user" });
                    }


                }

            }

        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Tilanne erittäin SOS" });
        }


    },
    checkToken: async (req, res) => {
        
        let token = req.query.rptoken;
        let now = Date.now();
        
        try {
            if (!token) {
                res.json({ status: "NOT OK", msg: "Could not verify the link" });
            }
            else {

                const client2 = new MongoClient(uri, { useUnifiedTopology: true });
                const user = await crud.findOne(client2, db, collection, { rptoken: token });
                let then = user.rpexpires;
                if (user) {
                    if(now>then){
                        res.json({ status: "NOT OK", msg: "The password reset link has expired" });
                    }
                    else{
                        res.json({ status: "OK", msg: "Verified succesfully" });
                    }
                    
                }
                else {
                    res.json({ status: "NOT OK", msg: "Token does not exist" });
                }
            }
        }

        catch (error) {
            res.json({ status: "NOT OK", msg: "--ERROR--" });
        }
    }


}