
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

// requests

app.get('/', (req,res) => {
    console.log('Welcome to Geo-App')
    res.status(200).send('Welcome to Geo-App')
})

app.get('/countries', (req, res) => {    //{"level": "M", "region": "AS", "numberRequests": "4"}
    const body = req.body
    if(Object.keys(body).length == 0){
        console.log(countryDB)
        res.status(200).send(JSON.stringify(countryDB))
    }
    else{
        const level = req.body.level
        const region = req.body.region
        const numberRequests = Number(req.body.numberRequests)

        const filteredDB = countryDB.filter(x => (x.level == level && x.region == region) )

        let countryIndexes = []
        for(i=0; i < numberRequests; i){
            randomIndex = Math.floor(Math.random()*filteredDB.length)
            if(!(randomIndex in countryIndexes)){
                countryIndexes.push(randomIndex)
                i++
            }        
        }

        let countries = []
        for(i in countryIndexes){
            let country = countryIndexes[i]
            countries.push(filteredDB[country])
        }

        console.log('Response: '+ countries)
        res.status(200).send(JSON.stringify(countries))}
    })

app.post('/updateScore', (req, res) =>{
    const {username, score} = req.body
    scoreBoard.push({username, score})
    res.status(201).send('Saved')
})

app.get('/scoreBoard', (req, res) => {
    // const scoreBoard = req.body
    const sortedScoreBoard = scoreBoard.sort((a, b) => b.score - a.score)
    console.log(scoreBoard)
    res.status(200).send(sortedScoreBoard)
})


// functions

module.exports = app