const nodemailer = require('nodemailer');
const crud = require('../database/crud');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var user = "user_basic";
var pw = "kevat21basic";
var db = "testi";
var collection = "usercol";

const uri = "mongodb+srv://" + user + ":" + pw + "@kielikanta.izgqz.mongodb.net/?retryWrites=true&w=majority";


// The credentials for the email account you want to send mail from. 
const credentials = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "ot2group0@gmail.com",
        pass: "ot2kevat2021"
    }
}

// Getting Nodemailer all setup with the credentials
const transporter = nodemailer.createTransport(credentials);

// email template
const template = (id) => {
    return ({
        subject: 'Welcome to Kieltenopetussovellus',
        html: `
        <p>Click the link below to confirm your email address:</p>
      <a href='http://127.0.0.1:3000/confirm/${id}'>
        Click to confirm email
      </a>
    `,
        text: `Copy and paste this link: http://127.0.0.1:3000/confirm/${id}`
    })
}

const sendMail = async (to, id) => {
    // The from and to addresses for the email that is about to be sent.
    const contacts = {
        from: "ot2group0@gmail.com",
        to: to
    };

    // content of the mail
    let content = template(id);

    // Combining the content and contacts into a single object that can
    // be passed to Nodemailer.
    const email = Object.assign({}, content, contacts);

    try {
        // send email
        await transporter.sendMail(email);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    /*
    sendMail: async (req, res) => {
        try {
            let c = req.query;
            if (!c.id) {
                res.json({ status: "NOT OK", msg: "Check fields" });
            }
            else {
                let id = c.id;
                let o_id = new ObjectId(id);
                const client1 = new MongoClient(uri, { useUnifiedTopology: true });
                const user = await crud.findOne(client1, db, collection, { _id: o_id });
                if (!user) {
                    res.json({ status: "NOT OK", msg: "Did not find user" });
                }
                else if (user.status === "activated") {
                    res.json({ status: "NOT OK", msg: "Email already confirmed" });
                }
                else {
                    sendMail(c.to, c.id)
                        .then(() => res.json({ status: "OK", msg: "Confirmation email send" }));
                }
            }
        }
        catch (error) {
            res.json({ status: "NOT OK", msg: "Error sending email" });
        }
    }
    */
    sendMail: sendMail,

    confirmEmail: async (req, res) => {
        try {
            let c = req.body;
            if (!c.id) {
                res.json({ status: "NOT OK", msg: "Check fields" });
            }
            else {
                let id = c.id;
                let o_id = new ObjectId(id);
                const client1 = new MongoClient(uri, { useUnifiedTopology: true });

                // change status to confirmed
                const update = await crud.updateOne(client1, db, collection, { _id: o_id }, { status: "confirmed" });

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
    }
}