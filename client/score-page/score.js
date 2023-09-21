// document.addEventListener("DOMContentLoaded", () => {
//     // Dummy score data for testing
//     // const scores = [
//     //     { username: "User1", score: 100 },
//     //     { username: "User2", score: 90 },
//     //     { username: "User3", score: 80 },
//     // ];

//     // Get the score list container
//     const scoreList = document.getElementById("score-list");

//     // Function to create and append a score entry
//     // function createScoreEntry(score, index) {
//     //     const scoreEntry = document.createElement("div");
//     //     scoreEntry.classList.add("score-entry");
//     //     scoreEntry.innerHTML = `<strong>${index + 1}. ${score.username}:</strong> ${score.score}`;
//     //     scoreList.appendChild(scoreEntry);
//     // }
//     function createScoreTable(data) {
//         console.log(data)
//     }

//     // Clear any existing content
//     scoreList.innerHTML = "";

//     // Iterate through scores and create score entries
//     scores.forEach((score, index) => {
//         createScoreEntry(score, index);
//     });
// });

const tableBody = document.getElementById('tableBody')
const scoreRecorded = document.querySelector('#scoreRecorded')
const message = document.querySelector('#message')

scoreRecorded.computedStyleMap.display = 'none'

const searchParams = new URLSearchParams(window.location.search)
  let params = {}
  for (const param of searchParams) {
    params[param[0]] = param[1]}
console.log(params)


let quiz = params.quiz
let score = params.score
let username = params.username

if(quiz && score){
    if(username == "undefined"){
       message.textContent =  `Congratulations! you have scored ${score} points on ${quiz}`
    }else{
    message.textContent = `Congratulations ${username}, you have scored ${score} points on ${quiz}`}
    scoreRecorded.computedStyleMap.display = 'flex'
}

fetchScoreBoard()

function createScoreTable(data) {
    console.log(data)
    for(let i = 0; i < data.length; i++){
        
        let record = data[i]

        let tr = document.createElement('tr')
        tr.id = `row ${i}`
        tableBody.appendChild(tr)

        const columns =['username', 'score', 'difficulty', 'quiz']
        let td = document.createElement('td')
            td.textContent = `${i+1}`
            tr.appendChild(td)

        for(let j = 0; j < columns.length; j++){
            let ele = columns[j]
            console.log(j, record[ele])
            let td = document.createElement('td')
            td.textContent = `${record[ele]}`
            tr.appendChild(td)
        }



    }
}


async function fetchScoreBoard() {
    try {
        const response = await fetch("http://localhost:3000/scoreBoard")
        if(response.ok) {
            const data = await response.json()
            createScoreTable(data)
        } else {
            throw "error status:" + response.status
        }
    } catch (error) {
        console.log("error")
    }
}