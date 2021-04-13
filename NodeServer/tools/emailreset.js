const nodemailer = require('nodemailer');

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
        subject: 'Password reset',
        html: `
        <p>Click the link below to enter a new password:</p>
      <a href='http://127.0.0.1:3000/resetpassword/${id}'>
        Click to enter new password
      </a>
    `,
        text: `Copy and paste this link: http://127.0.0.1:3000/resetpassword/${id}`
    })
}

const sendresetMail = async (to, id) => {
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
    sendresetMail: sendresetMail
}