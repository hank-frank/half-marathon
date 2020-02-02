const express = require('express');
const axios = require('axios');
const morgan = require("morgan");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const dotenv = require("dotenv");
// dotenv.config();

const novice2 = require('../src/training/novice2.json');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// app.use(morgan("dev"));
app.use(express.static('dist'));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'half-marathon';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

//inserts initial DB entry in 'schedules' w/ "name": "henry"
// client.connect(function(err) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     const db = client.db(dbName);

//     db.collection('schedules').insertOne(novice2, function(err, r) {
//         assert.equal(null, err);
//         assert.equal(1, r.insertedCount);
//         console.log(`inserting w/ id: `, novice2._id);
//     })

//     client.close();
// });

app.get('/getSchedule', (req, res) => {
    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection('schedules');

        //finds first one
        // col.findOne({}, function(err, results) {
        //     if (err) throw err;
        //     console.log(results);
        // }) 

        //find specific one currently hard coded to find my name     can eventually be used to search by username
        col.find({name: 'henry'}, { projection: {schedule: 1, name: 1}}).toArray(function(err, result) {
            if (err) throw err;
            console.log(`result of find: `, result);
            res.status(200).send(result[0]);
            // client.close();
        });

    })
})

app.post('/cleanup', (req, res) => {
    console.log("calling route /cleanup")
    console.log(`request in cleanup: `, req.body.trainingInfo);
    const userData = req.body.trainingInfo;

    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection('schedules');

        let myquery = { name: userData.name };
        let newValues = { $set: {schedule: userData.schedule } };
    
        col.updateOne(myquery, newValues, function(err, res) {
            if (err) throw err;
            // console.log("1 document updated - just consolelog not real confirmation");
            console.log(`res in update: `, res.result);
            //res.send(200)
            
            client.close();
        });
    });

})


module.exports = app;
