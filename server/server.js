const express = require('express');
const axios = require('axios');
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static('dist'));


module.exports = app;
