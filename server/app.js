
// imports
const express = require('express');
const cors = require('cors');
const logger = require("./logger");
const countryDB = require('./assets/countryDB.json')
const scoreBoard = require('./assets/scoreBoard.json')



// Middleware
const app = express();
app.use(cors());
app.use(express.json())
app.use(logger);

