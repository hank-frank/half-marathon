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

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'half-marathon';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server

//inserts initial DB w/ "name": "henry"
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

app.get('/training', (req, res) => {
    

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

        //fine specific one
        col.find({name: 'henry'}, { projection: {schedule: 1, name: 1}}).toArray(function(err, result) {
            if (err) throw err;
            // console.log(`result of find: `, result);
            //sending results array not individual result. need to whittle down to that. 
            res.send(result);
        })

        // client.close();
    })

    // (async function() {
    //     try {
    //         await client.connect();
    //         console.log("Connected correctly to server");
    //         const db = client.db(dbName);
        
    //         // Get the collection
    //         const col = db.collection('schedules');
            
    //         // Get first two documents that match the query
    //         const docs = await col.findOne({});
    //         console.log(`found it: `, docs);
        
    //         // Close connection
    //         client.close();
    //         } catch(err) {
    //         console.log(err.stack);
    //         }
    //     })();
})

//not working
app.post('/cleanup', (req, res) => {
    console.log(`request: `, req.body);
    // res.send(`Post received: `, req.body);
    
        // res.status(204).send(req.body);
})


module.exports = app;
