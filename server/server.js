const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const withAuth = require('./authCheck.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// const dotenv = require("dotenv");
// dotenv.config();

const novice2 = require('../src/training/novice2-front.json');
const secret = 'mysecrets';

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


app.use(morgan("dev"));
app.use(express.static('dist'));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'half-marathon';

const client = new MongoClient(url, { useUnifiedTopology: true });

// inserts initial DB entry in 'schedules' w/ "name": "henry"
// client.connect(function(err) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     const db = client.db(dbName);
        //inserts original
//     db.collection('schedules').insertOne(novice2, function(err, r) {
//         assert.equal(null, err);
//         assert.equal(1, r.insertedCount);
//         console.log(`inserting w/ id: `, novice2._id);
//     })

//     client.close();
// });

app.get('/checkToken', withAuth, (req, res) => {
    res.status(200).send("it Worked")
})

app.post('/auth', (req, res) => {
    const { userName, password } = req.body;
    if (userName === '' ) {
        res.status(401);
    }

    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("Auth route connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection('schedules');

        col.find({name: userName}, { projection: {schedule: 1, name: 1, password: 1}}).toArray(function(err, result) {
            if (err) throw err;
            if (result.length > 0) {
                let person = result[0];
                if (person.password === password) {
                    const userNoPassword = {
                        _id : person._id,
                        name: person.name,
                        schedule: person.schedule
                    }
                    const payload = { userName };
                    const token = jwt.sign(payload, secret, { expiresIn: '1h'});
                    res.cookie('token', token, { httpOnly: false }).status(200).send(userNoPassword);
                } else {
                    //sending back username, could be problem for redirecting validation on front?
                    res.status(401).send({name: userName});
                }
            } else {
                console.log(`invalid search no result`);
                res.status(401).send({name: userName});
            }
        });
    });
})

app.get('/getSchedule', withAuth, (req, res) => {
    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("Fetch schedule connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection('schedules');

        //find specific one currently hard coded to find my name     can eventually be used to search by username
        col.find({name: 'henry'}, { projection: {schedule: 1, name: 1, password: 1}}).toArray(function(err, result) {
            if (err) throw err;
            console.log(`result of find: `, result);
            res.status(200).send(result[0]);
        });
    })
})

app.post('/getUserInfo', (req, res) => {
    let token = req.body.userToken;
    var decoded = jwt.verify(token, secret);
    const user = decoded.userName;

    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("Fetch schedule connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection('schedules');

       // find specific one currently hard coded to find my name     can eventually be used to search by username
        col.find({name: user}, { projection: {schedule: 1, name: 1, password: 1}}).toArray(function(err, result) {
            if (err) throw err;
            console.log(`result of find: `, result);
            res.status(200).send(result[0]);
        });
    })
})

app.post('/save', withAuth, (req, res) => {
    console.log("calling route /save")
    console.log(`request in cleanup: `, req.body.trainingInfo);
    const userData = req.body.trainingInfo;

    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("cleanup route connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection('schedules');

        let myquery = { name: userData.name };
        let newValues = { $set: {schedule: userData.schedule } };
    
        col.updateOne(myquery, newValues, function(err, response) {
            if (err) throw err;
            // console.log("1 document updated - just consolelog not real confirmation");
            console.log(`res in update: `, response.result);
            res.status(200).send(response.result);
            // client.close();
        });
    });
})

app.post('/register', (req, res) => {
    const { userName, password } = req.body;
    if (userName === '' || password === '') {
        res.status(401);
    } else {
        client.connect(function(err, client) {
            assert.equal(null, err);

            const db = client.db(dbName);
            const col = db.collection('schedules');
        
            const newUser = {
                name: userName,
                password: password,
                schedule: novice2,
            };

            col.insertOne(newUser, (err, response) => {
                if (err) throw err;
                console.log('1 document inserted');
                console.log(`res.ops: `, response.ops);
                res.status(200).send(response.ops);
            })
        });
    }
})

module.exports = app;
