
const question = document.querySelector("#questions")
const setting = document.querySelector("#setting")
const submit = document.querySelector("#answerSubmit")
const worldMap = document.querySelector("#worldMap")
const optionSelect = document.querySelector("#options")
const form = document.querySelector("#quiz")
const result = document.querySelector("#result")

console.log(result)
setting.addEventListener("submit",getCountries)
form.addEventListener("submit",nextq)

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

function nextq(e){
  e.preventDefault()
  console.log("next clicked")
  let passedAnswer = e.target.answer.value
  console.log("answer" + passedAnswer)
  if(passedAnswer.length == 0){
    console.log("please select an asnwer")
    alert("Please Select and answer")
  }else{
    checkAnwser(passedAnswer)
    if(number_of_qestions < 2){
    number_of_qestions++
    nextcountries()
    console.log("answerid " + id)
    }else{
      console.log("done")
      console.log(score)
      showScore()
    }
  }
}

function checkAnwser(answer){
  if(id == answer){
    score++
    console.log("score" + score)
  }else{
    console.log("wrong answer")
  }
}

function showScore(){
  worldMap.innerHTML = ""
  optionSelect.innerHTML = ""
  submit.innerHTML = ""
  console.log("result")
  let showResult = document.createAttribute("p")
  console.log("result")
  showResult.textContent = `Final result:`
  result.appendChild(showResult)
}

function addImage(url){
  let map = document.createElement("img")
  map.src = url
  map.width = 1500
  worldMap.appendChild(map)
}
function nextcountries(){
  worldMap.innerHTML = ""
  optionSelect.innerHTML = ""
  submit.innerHTML = ""
  fetchCountries(level, region, numberRequests)
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


  