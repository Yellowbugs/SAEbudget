const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 10000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'public')));


app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'dashboard.html'))
});

app.post('/login', urlencodedParser, function(req,res) {
    if(req.body.username == "Josh" && req.body.password == "12345"){
        res.sendStatus(200)
    }
    else{
        res.sendStatus(404)
    }
});



app.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));