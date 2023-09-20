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

fetchScoreBoard()

function createScoreTable(data) {
    console.log(data)
    for(let i = 0; i < data.length; i++){
        
        let record = data[i]

        let tr = document.createElement('tr')
        tr.id = `row ${i}`
        tableBody.appendChild(tr)

<<<<<<< HEAD
        let th = document.createElement('th')
        th.id = `row ${i}`
        th.scope = 'row'
        tr.appendChild(th)

        const columns =['username', 'score', 'difficulty', 'quizz']
=======
        const columns =['username', 'score', 'difficulty', 'quiz']
        let td = document.createElement('td')
            td.textContent = `${i+1}`
            tr.appendChild(td)
>>>>>>> 1354be3a6d00fcd880c3621133dd0490efebf4c5

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