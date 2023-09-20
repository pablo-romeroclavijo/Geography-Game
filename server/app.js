
// imports
const express = require('express');
const cors = require('cors');
const logger = require("./logger");
const countryDB = require('./assets/countryDB.json')
const scoreBoard = require('./assets/scoreBoard.json')
const fs = require('fs')



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

app.get('/countries', (req, res) => { 
    console.log(countryDB)
    res.status(200).send(JSON.stringify(countryDB))
    })


app.get('/countries/:level&:region&:numberRequests', (req, res) => {    //{"level": "M", "region": "AS", "numberRequests": "4"}
        const level = req.params.level
        const region = req.params.region
        const numberRequests = Number(req.params.numberRequests)
        let filteredDB = undefined


        if(level == "all" && region !=="all"){filteredDB = countryDB.filter(x => (x.region == region))}
        else if(region == "all" && level !== "all"){filteredDB = countryDB.filter(x => (x.level == level))}
        else if(level == "all" && region == "all"){filteredDB = countryDB}
        else {filteredDB = countryDB.filter(x => (x.level == level && x.region == region))}

        if(filteredDB.length == 0){
            console.log('No records found')
            res.status(400)
        }
        else if(filteredDB.length < numberRequests){        //not enough countries in the filter
            console.log('Response: '+ filteredDB)
            res.status(200).send(JSON.stringify(filteredDB))
        }else{

            let countryIndexes = []
            for(i=0; i < numberRequests; i){
                randomIndex = Math.floor(Math.random()*filteredDB.length)
                if(!(countryIndexes.includes(randomIndex))){
                    countryIndexes.push(randomIndex)
                    i++
                }        
            }
            console.log(countryIndexes)
            let countries = []
            for(i in countryIndexes){
                let country = countryIndexes[i]
                countries.push(filteredDB[country])
            }

            res.status(200).send(JSON.stringify(countries))
        }
    }
)

app.get('/image/:type/:ID', (req, res)=>{
    const type = req.params.type
    const ID = req.params.ID
    let prefix = undefined
    let fileType = undefined
    if(type == 'maps'){
        fileType = 'png'
        prefix = 'm'
    }else if(type == 'flags'){
        fileType = 'gif'
        prefix = 'f'
    }
    const img = fs.readFileSync(`./assets/${type}/${prefix}${ID}.${fileType}`)
    res.send(img)
})

app.post('/updateScore', (req, res) => {
    const user = req.body;   
    scoreBoard.push(req.body)
    //console.log(scoreBoard)

    // // Save the updated scoreBoard back to the JSON file
    // fs.writeFileSync('./assets/scoreBoard.json', JSON.stringify(scoreBoard, null, 2));

    // Respond with a success message or updated data
    res.status(200).json({ message: 'Score updated successfully', scores: scoreBoard });

})

// app.post('/updateScore', (req, res) => {
//     const user = req.body.value;
//     const userName = user.username;
//     const scorex = user.score;
//     const difficultyx = user.difficulty;

//     // Assuming the username is unique, check if the user already exists in the array
//     const existingUserIndex = scoreBoard.findIndex(item => item.username === userName);

//     if (existingUserIndex !== -1) {
//         // If the user already exists, update their score and difficulty
//         scoreBoard[existingUserIndex].score = scorex;
//         scoreBoard[existingUserIndex].difficulty = difficultyx;
//     } else {
//         // If the user doesn't exist, add them to the array
//         scoreBoard.push({
//             "username": username,
//             "score": score,
//             "difficulty": difficulty
//         });
//     }

//     // Save the updated scoreBoard back to the JSON file
//     fs.writeFileSync('./assets/scoreBoard.json', JSON.stringify(scoreBoard, null, 2));

//     // Respond with a success message or updated data
//     res.status(200).json({ message: 'Score updated successfully', scores: scoreBoard });
// });



app.get('/scoreBoard', (req, res) => {
    const sortedScoreBoard = scoreBoard.sort((a, b) => b.score - a.score)
    const topScore = sortedScoreBoard.slice(0, 10)
    console.log(topScore)
    res.status(200).send(JSON.stringify(topScore))
})

 
// functions

module.exports = app