const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/*', function (req,res) {
    res.sendFile(req.url, {root: './public'});
});

app.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));