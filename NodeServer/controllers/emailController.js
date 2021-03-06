const crud = require('../database/crud');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var email = require('../tools/email');

var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "usercol";

const uri = "mongodb+srv://" + user + ":" + pw + "@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
    // update status from "" to "confirmed"
    confirmEmail: async (req, res) => {
        try {
            let c = req.body;
            if (!c.id) {
                res.json({ status: "NOT OK", msg: "Check fields" });
            }
            else {
                let o_id = new ObjectId(c.id);
                const client1 = new MongoClient(uri, { useUnifiedTopology: true });

                // change status to confirmed
                const update = await crud.updateOne(client1, db, collection, { _id: o_id, status: "" }, { status: "confirmed" });

                if (update > 0) {
                    res.json({ status: "OK", msg: "Email confirmed" });
                }
                else {
                    res.json({ status: "NOT OK", msg: "Email already confirmed or user does not exist" });
                }
            }
        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Error confirming email" });
        }
    },

    // resend confirmation link email
    resendEmail: async (req, res) => {
        let c = req.query;
        if (!c.id) {
            res.json({ status: "NOT OK", msg: "Check fields" });
        }
        else {
            try {
                let o_id = new ObjectId(c.id);
                const client1 = new MongoClient(uri, { useUnifiedTopology: true });

                const user = await crud.findOne(client1, db, collection, { _id: o_id });
                if (user) {
                    email.sendMail(user.email, c.id)
                    .then(() => res.json({ status: "OK", msg: "Email sent" }));
                }
                else {
                    res.json({ status: "NOT OK", msg: "User does not exist" });
                }
            }
            catch (error) {
                res.json({ status: "NOT OK", msg: "Error sending email" });
            }
        }

    }
}