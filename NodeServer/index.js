//Aloitus sivu


/*
Ladatut kirjastot:
1. Expres 
2. Body-parser 
3. Express-session
4. MongoDB
*/

//Portti ja hostnimi jota serveri kuuntelee
var port = 3000; 
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



//Asetetaan serveri kuuntelemaan määriteltyäreittiä
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});