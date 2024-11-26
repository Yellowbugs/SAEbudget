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
    var successfulLogin = loginAttempt(req.body.username, req.body.password)
    if (successfulLogin){
        res.send(200)
    }
    else{
        res.sendStatus(404)
    }
});

async function loginAttempt(attemptedUsername, attempedPassword) {
    const usernameQuery = 'SELECT username FROM users' 
    const passwordQuery = 'SELECT password FROM users'
  
    try {
      await client.connect()
      const usernames = await client.query(usernameQuery)
      const passwords = await client.query(passwordQuery)

      console.log(usernames.rows)
      console.log(passwords.rows)
    } catch (err) {
      console.error('Error executing query:', err.message)
    } finally {
      var success = usernames.rows.some(row => row.username === attemptedUsername) && passwords.rows.some(row => row.password === attempedPassword)
      await client.end();
      return success
    }
  }



app.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));