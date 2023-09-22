const tableBody = document.getElementById('tableBody')

fetchScoreBoard()
generateCarousel(100)




const carousel = document.querySelector('.carousel');
        let currentIndex = 0;

        function showSlide(index) {
            const translateX = -index * 100;
            carousel.style.transform = `translateX(${translateX}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % 40;
            showSlide(currentIndex);
        }

        setInterval(nextSlide, 500); // Change slide every 5 seconds (adjust as needed)
        showSlide(currentIndex); // Show the initial slides

function generateCarousel(number){
    for(i=0; i<number; i++){
        randomIndex = Math.floor(Math.random()*190)
        fetchImage('flags', randomIndex)
    }
}

function addImage(url, ID){
    let flag = document.createElement('div')
    flag.classList.add("carousel-slide")
    carousel.appendChild(flag)

    let img = document.createElement('img')
    img.src = url
    img.width = 200
    img.height = 100
    flag.appendChild(img)}




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

async function fetchImage(type, ID) {
  
    //Make sure to add your deployed API URL in this fetch
    // try {
      let response = await fetch(`http://localhost:3000/image/${type}/${ID}`);
      if(response.ok){
        const imageBlob = await response.blob()
        const imageURL = URL.createObjectURL(imageBlob)
        addImage(imageURL, ID)}
      else {throw 'Error status: ' + response.status}
        }


module.exports = { showSlide, nextSlide, generateCarousel, addImage, createScoreTable, fetchScoreBoard, fetchImage }