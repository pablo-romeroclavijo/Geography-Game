const tableBody = document.getElementById('tableBody')

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