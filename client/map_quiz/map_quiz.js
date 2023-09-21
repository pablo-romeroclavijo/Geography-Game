
const question = document.querySelector("#question")
const setting = document.querySelector("#setting")
const submit = document.querySelector("#answerSubmit")
const worldMap = document.querySelector("#worldMap")
const optionSelect = document.querySelector("#options")
const form = document.querySelector("#quiz")
const userinput = document.querySelector("#userinput")
console.log(userinput)

userinput.style.display = "none"
question.style.display = "none"
setting.addEventListener("submit",getCountries)
form.addEventListener("submit",nextq)
userinput.addEventListener("submit",submituser)

let id
let countries = {}
let level;
let region;
let numberRequests;
let number_of_qestions;
let score;
let userName;


function submituser(e){
  e.preventDefault()
  userName = e.target.name.value
  console.log(userName)
  userinput.style.display = "none"
  question.style.display = "none"
  question.textContent = "What is the name of the highlighted country in the below picture?"
  postScore(userName)
}

function startQuiz(q){
  question.style.display = "block"
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
  button.classList.add("btn", "btn-primary")
  button.type = "submit"
  button.value = "NEXT"
  submit.appendChild(button)
}


function generateOption(name,id){
  let radioBox = document.createElement('div')
  radioBox.classList.add('radio-box', 'd-inline-flex')
  optionSelect.appendChild(radioBox)

  console.log(name)
  let option1 = document.createElement("input")
  option1.classList.add("option-radio")
  option1.type = "radio"
  option1.id = id
  option1.value = id
  console.log("value " + option1.value)
  option1.name = "answer"
  console.log(option1)
  radioBox.appendChild(option1)
 
  let label = document.createElement('label')
  console.log(option1)
  label.classList.add("label-radio")
  label.setAttribute('for', option1.id)
  label.textContent = name
  radioBox.appendChild(label)
}

function nextq(e){
  e.preventDefault()
  console.log("next clicked")
  let passedAnswer = e.target.answer.value
  console.log("answer" + passedAnswer)
  if(passedAnswer.length == 0){
    
    alert("Please Select an answer")
    
  }else{
    checkAnwser(passedAnswer)
    if(number_of_qestions < 10){
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
    score += 100
    console.log("score" + score)
  }else{
    console.log("wrong answer")
  }
}

function showScore(){
  worldMap.innerHTML = ""
  optionSelect.innerHTML = ""
  submit.innerHTML = ""
  question.textContent = ""
  question.textContent = `Final result: ${score}`
  userinput.style.display = "block"
}

function addImage(url){
  let map = document.createElement("img")
  map.src = url
  
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
  score = 0;
  number_of_qestions = 0;
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
//posting images
async function postScore(username){
  const data = {
    'username': username,
    'score' : score,
    'difficulty': level,
    'quiz': 'Map Quiz'
  }
  console.log(data)
  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)}
    
    try {
      const response =  await fetch ('http://localhost:3000/updateScore', options)
      if(response.ok){
        console.log('Record created')

        location.href = `/client/score-page/scorePage.html?username=${username}&score=${score}&quiz=FlagQuiz`
      }else {throw 'Error status: ' + response.status
    }
    }catch(e){console.log('error at  catch')}
}
  