const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { Pool } = require('pg')
var conString = 'postgresql://saebudgetdb_user:cqqkgEHDgj0QBUa2zhgNzrOm0rfBANbr@dpg-ct2or1jv2p9s73b0b0gg-a/saebudgetdb'
const pool = new Pool({
    connectionString: conString,
    ssl: { rejectUnauthorized: false },  
  });

const app = express();
const PORT = process.env.PORT || 10000;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'public')));


app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'dashboard.html'))

});


app.post('/login', urlencodedParser, function(req,res) {
    var successfulLogin = loginAttempt(req.body.username, req.body.password)
    console.log(successfulLogin)
    if (successfulLogin){
        res.sendStatus(200)
    }
    else{
        res.sendStatus(404)
    }
});

async function loginAttempt(attemptedUsername, attemptedPassword) {
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [attemptedUsername, attemptedPassword];

    try {
        const res = await pool.query(query, values);
        console.log(res.rows)
        console.log(attemptedUsername)
        console.log(attemptedPassword)
        if (res.rows.length > 0) {
            console.log('Authentication successful!');
            return true;
        } else {
            console.log('Authentication failed.');
            return false;
        }
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
  }



app.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));