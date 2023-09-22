const numbers = document.querySelector('#number')
const question = document.querySelector('#question')
const options = document.querySelector('#options')
const submitButton = document.querySelector('#answerSubmit')
const result = document.querySelector('#result')
const radioButtons = document.getElementsByName('answer')
const next = document.getElementById('next')



// nextQ.addEventListener('click', getCountries(level, region, numberRequests))


submitButton.addEventListener('click', checkAnwser)
next.addEventListener('click', getCountries)

const searchParams = new URLSearchParams(window.location.search)
  let params = {}
  for (const param of searchParams) {
    params[param[0]] = param[1]}


let trueAnswer = undefined
let i = 1
let score = 0

let numberOfQuestions = Number(params.nQuestions)
let level = params.level
let region = params.region
let username = params.username
let numberRequests = params.nRequest


getCountries()

function createQuestion(data){
  const countries = data
  const randomIndex = Math.floor(Math.random()*countries.length)
  trueAnswer = countries[randomIndex]

  let quest = document.createElement('h3')
  let number = document.createElement('h2')


  quest.textContent = `What is the flag of ${trueAnswer.name}?`
  number.textContent = `QUESTION ${i} of ${numberOfQuestions}`

  numbers.appendChild(number)
  question.appendChild(quest)



  for(country in countries){
    let ID = countries[country].ID
    let type = 'flags'
    fetchImage(type, ID)
  }
  let button = document.createElement('button')
  button.id = 'SubmitButton'
  button.textContent = `Check answer`
  button.classList.add('btn', 'm-2', 'start-50', 'position-relative', 'translate-middle-x')
  button.setAttribute('style', 'background-color: #8A4FFF; color: white;  font-size: 25px; " type="submit" value="Start Quiz"')
  submitButton.appendChild(button)

  let nextQuestion = document.createElement('button')
  nextQuestion.id = 'NextQuestion'
  if(i<numberOfQuestions){
    nextQuestion.textContent = `Next Question`
    nextQuestion.classList.add('btn', 'm-2', 'start-50', 'position-relative', 'translate-middle-x')
    nextQuestion.setAttribute('style', 'background-color: #C3BEF7; color: black;  font-size: 25px; " type="submit"')
    submitButton.appendChild(button)}
    
  else{
    nextQuestion.textContent = `Finish Quiz`
    nextQuestion.classList.add('btn', 'm-2', 'start-50', 'position-relative', 'translate-middle-x')
    nextQuestion.setAttribute('style', 'background-color: #C3BEF7; color: black;  font-size: 25px; " type="submit"')
  }
  nextQuestion.style.display = "none";
  result.style.display = 'none'
  next.appendChild(nextQuestion)
}

function addImage(url, ID){
  let radioBox = document.createElement('div')
  radioBox.classList.add('radio-box', 'd-inline-flex')
  options.appendChild(radioBox)


  let input = document.createElement('input')
  input.classList.add('radio-input')
  input.type = 'radio'
  input.id = ID
  input.value = ID
  input.name = 'answer'
  radioBox.appendChild(input)

  let label = document.createElement('label')
  label.classList.add('radio-label')
  label.setAttribute('for', ID)
  radioBox.appendChild(label)

  let img = document.createElement('img')
  img.classList.add('radio-img')
  img.src = url
  img.width = 250
  img.id = 'f' + ID
  label.appendChild(img)

}

function getCountries(){
  if(i<numberOfQuestions+1){
    number.innerHTML = ''
    question.innerHTML = ""
    options.innerHTML = ""
    submitButton.innerHTML = ""
    result.innerHTML = ""
    next.innerHTML = ""
    
    fetchCountries(level, region, numberRequests)}
  else{
    console.log('score:',  score)
    postScore()

  }
}

function checkAnwser(e){
  e.preventDefault()
 
  let answer = undefined


  result.innerHTML=""
  let displayResult = document.createElement('h2')
  
  for(j = 0 ; j < radioButtons.length; j++){
    if(radioButtons[j].checked){
      answer = radioButtons[j].value
      break
    }
  }
  
  if(answer == trueAnswer.ID){
    displayResult.textContent = 'Right Answer'
    score += 100
    for(j = 0 ; j < radioButtons.length; j++){
      if(radioButtons[j].checked){
        const ele = radioButtons[j].id

        const img = document.querySelector(`#f${ele}`)

        img.setAttribute('style', 'background-color: #28F80D')
        break}}
    console.log('right answer')
  }else{
    for(j = 0 ; j < radioButtons.length; j++){
      if(radioButtons[j].checked){
        const ele = radioButtons[j].id
        const img = document.querySelector(`#f${ele}`)
        img.setAttribute('style', 'background-color: #FF0000')
        break}}
      const img = document.getElementById(`f${trueAnswer.ID}`)
      img.setAttribute('style', 'background-color: #28F80D')
    console.log('wrong answer')

    displayResult.textContent = 'Wrong Answer'
  }
  console.log(score)  

result.appendChild(displayResult)
result.style.display =  'flex'
document.getElementById('SubmitButton').style.display = "none"
document.getElementById('NextQuestion').style.display = "inline-block"
i++

}



//requests
async function fetchCountries(level, region, numberRequests) {
  console.log(level, region, numberRequests)
  //Make sure to add your deployed API URL in this fetch
  try {
    const response = await fetch(`http://localhost:3000/countries/${level}&${region}&${numberRequests}`);
    if(response.ok){
        const data = await  response.json()
        createQuestion(data)
    }
    else {throw 'Error status: ' + resp.status}
  }
  catch(e){console.log('error at  catch')}
}


async function fetchImage(type, ID) {
  
  //Make sure to add your deployed API URL in this fetch
  // try {
    const response = await fetch(`http://localhost:3000/image/${type}/${ID}`);
    if(response.ok){
      const imageBlob = await response.blob()
      const imageURL = URL.createObjectURL(imageBlob)
      addImage(imageURL, ID)
    }
    else {throw 'Error status: ' + response.status}
  }
  // catch(e){console.log('error at  catch')}
// }

async function postScore(){
  const dict = {
    'M': 'Medium',
    'E': 'Easy',
    'H': 'Hard',
    'all': 'All levels',
  }

  const data = {
    'username': username,
    'score' : score,
    'difficulty': dict[level],
    'quiz': 'Flag Quiz'
  }

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

module.exports = { createQuestion, addImage, getCountries, checkAnwser, fetchCountries, fetchImage, postScore };

