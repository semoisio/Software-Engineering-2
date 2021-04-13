//Aloitus sivu


/*
Ladatut kirjastot:
1. Expres 
2. Body-parser 
3. Express-session
4. MongoDB
*/

//Portti ja hostnimi jota serveri kuuntelee
var port = 3001; 
var hostname = "127.0.0.1";

//Otetaan express käyttöön
var express = require('express'); 
var app = express();

//Bodyparser json serverin käyttöön
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());

//Määritellään mitä serveri hyväksyy. REST-tyyppinen
var cors = function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

// user routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

// audio routes
const audioRoutes = require('./routes/audioRoutes');
app.use(audioRoutes);

// email routes
const emailRoutes = require('./routes/emailRoutes');
app.use(emailRoutes);

// login routes
const loginRoutes = require('./routes/loginRoutes');
app.use(loginRoutes);

// reset email routes
const emailResetRoutes = require('./routes/emailresetRoutes');
app.use(emailResetRoutes);

//Asetetaan serveri kuuntelemaan määriteltyäreittiä
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});