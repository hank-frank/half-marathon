const express = require('express');
const axios = require('axios');
const morgan = require("morgan");
// const dotenv = require("dotenv");
// dotenv.config();

const app = express();

// app.use(morgan("dev"));
app.use(express.static('dist'));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});


module.exports = app;
