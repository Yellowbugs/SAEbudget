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

app.get('/2FA', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '2FA.html'));
});

app.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'dashboard.html'))

});


app.post('/login', urlencodedParser, function(req,res) {
    loginAttempt(req.body.username, req.body.password).then(x => { 
        var successfulLogin = x
    
        if (successfulLogin){
            res.status(200).send(successfulLogin)
        }
        else{
            res.sendStatus(404)
        }
    })  
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
            return res.rows[0];
        } else {
            console.log('Authentication failed.');
            return false;
        }
    } catch (err) {
        console.error('Error executing query:', err.message);
        throw err;
    }
  }
function generate2faCode() {
        return Math.floor(100000 + Math.random() * 900000); 
    }
var Code = generate2faCode();
//2fa shit work in progress

app.post("/send-email", async (req, res) => {
  const { email, message } = req.body;
     const nodemailer = require("nodemailer");
    
     const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "saebudget@gmail.com",
            pass: "vddb oqvk onuv rrec"
        },
    });
   try {
      await transporter.sendMail({
          to: email,
          subject: "Your 2-factor Authentication Code",
          html: `<h1>${message}</h1>`,
      });
      res.status(200).send('Email sent successfully');
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email');
  }
});




app.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));
