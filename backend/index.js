const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fs = require('fs');

let db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '411project',
    database: 'data'
});

db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/createUser", (require, response) => {
    const ID = Math.floor((Math.random() * 100000000) + 1);
    const pass = require.body.pass;
    const Email = require.body.ID;

    const sqlInsert = "INSERT INTO `Users` (`UserID`, `Pass`, `Email`) VALUES (?,?,?)";
    db.query(sqlInsert, [ID, pass, Email], (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    })
});

app.get("/api/getUser/*", (require, response) => {
    console.log("hi");
    // const ID = require.query.ID;
    let path = req.originalUrl;
    const ID = path.substring(20, path.length);

    // const ID = require.body.params.ID;
    console.log(ID)

    const sqlSelect = "SELECT u.UserID, u.Email, u.Password FROM Users u WHERE u.UserID = ?";
    db.query(sqlSelect, [ID], (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
            response.send(result);
        }
    });
});

app.listen(3000, () => {
    console.log("running on port 3000");
})

