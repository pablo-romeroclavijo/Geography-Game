
const question = document.querySelector("#questions")
const setting = document.querySelector("#setting")
const submit = document.querySelector("#answerSubmit")
const worldMap = document.querySelector("#worldMap")
const optionSelect = document.querySelector("#options")
const form = document.querySelector("#quiz")

setting.addEventListener("submit",getCountries)
form.addEventListener("submit",checkAnwser)

let id
let countries = {}
let level;
let region;
let numberRequests;
let number_of_qestions = 0;
let score = 0;

function startQuiz(q){
  const randomIndex = Math.floor(Math.random()*q.length)
  console.log(randomIndex)
  id = q[randomIndex].ID
  console.log("answerindex" + id)
  fetchImage("maps",id)
  q.forEach(element => {
    console.log(element)
    generateOption(element.name,element.ID)
  })
  let button = document.createElement('input')
  button.type = "submit"
  submit.appendChild(button)
}
function generateOption(name,id){
  console.log(name)
  let option1 = document.createElement("input")
  option1.type = "radio"
  option1.id = id
  option1.value = id
  console.log("value " + option1.value)
  option1.name = "answer"
  console.log(option1)
  optionSelect.appendChild(option1)
 
  let label = document.createElement('label')
  console.log(option1)
  label.setAttribute('for', option1.id)
  label.textContent = name
  optionSelect.appendChild(label)
}

function checkAnwser(e){
  e.preventDefault()
  console.log("next clicked")
  let passedAnswer = e.target.answer.value
  worldMap.innerHTML = ""
  optionSelect.innerHTML = ""
  submit.innerHTML = ""
  if(number_of_qestions < 10){
  number_of_qestions++
  console.log("answerid " + id)
  if(id == passedAnswer){
    console.log("right answer")
    score ++
    console.log("score" + score)
  }else{
    console.log("wrong answer")
  }
  console.log(number_of_qestions)
  fetchCountries(level, region, numberRequests)
  }else{
    console.log("done")
    console.log(score)
  }
 
  
}

function addImage(url){
  let map = document.createElement("img")
  map.src = url
  map.width = 1500
  worldMap.appendChild(map)
}

function getCountries(e){
  e.preventDefault()
  console.log("setting clicked")
  worldMap.innerHTML = ""
  optionSelect.innerHTML = ""
  submit.innerHTML = ""
  
  level = e.target.level.value
  region = e.target.region.value
  numberRequests = "4"
  
  fetchCountries(level, region, numberRequests)
}

async function fetchCountries(level, region, numberRequests) {
  //Make sure to add your deployed API URL in this fetch
  try {
    const response = await fetch(`http://localhost:3000/countries/${level}&${region}&${numberRequests}`);
    if(response.ok){
        const data = await response.json()
        startQuiz(data)
    }
    else {throw 'Error status: ' + resp.status}
  }
  catch(e){console.log('error at  catch')}
}

async function fetchImage(type,ID) {
  
  //Make sure to add your deployed API URL in this fetch
   try {
    const response = await fetch(`http://localhost:3000/image/${type}/${ID}`);
    if(response.ok){
      console.log("ok")
      const mapBolb = await response.blob()
      const imageURL = URL.createObjectURL(mapBolb)
      console.log(imageURL)
      addImage(imageURL)
    }
    else {throw 'Error status: ' + response.status}
  }
  catch(e){console.log('error at  catch')}
}


  