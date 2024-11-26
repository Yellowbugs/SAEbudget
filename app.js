const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { Client } = require('pg')
var conString = 'postgresql://saebudgetdb_user:cqqkgEHDgj0QBUa2zhgNzrOm0rfBANbr@dpg-ct2or1jv2p9s73b0b0gg-a/saebudgetdb'
const client = new Client(conString)

const app = express();
const PORT = process.env.PORT || 10000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'public')));


app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'dashboard.html'))

});


app.post('/login', urlencodedParser, function(req,res) {
    client.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
    if(req.body.username == "Josh" && req.body.password == "12345"){
        res.sendStatus(200)
    }
    else{
        res.sendStatus(404)
    }
});



app.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));