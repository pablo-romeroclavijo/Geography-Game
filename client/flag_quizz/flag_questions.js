const question = document.querySelector('#questions')
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
console.log(params)

let trueAnswer = undefined
let i = 1
let scores = []

let numberOfQuestions = Number(params.nQuestions)
let level = params.level
let region = params.region
let username = params.username
let numberRequests = params.nRequest

console.log(numberOfQuestions)

getCountries()

function createQuestion(data){
  const countries = data
  const randomIndex = Math.floor(Math.random()*countries.length)
  trueAnswer = countries[randomIndex]

  let quest = document.createElement('h3')
  let number = document.createElement('h2')

  number.classList.add('p-2')
  quest.classList.add('p-2')
  quest.textContent = `What is the flag of ${trueAnswer.name}?`
  number.textContent = `QUESTION ${i} of ${numberOfQuestions}`

  question.appendChild(number)
  question.appendChild(quest)



  for(country in countries){
    let ID = countries[country].ID
    let type = 'flags'
    fetchImage(type, ID)
  }
  let button = document.createElement('button')
  button.id = 'SubmitButton'
  button.textContent = `Check answer`
  button.classList.add('btn', 'btn-danger', 'position-static', 'm-2')
  submitButton.appendChild(button)

  let nextQuestion = document.createElement('button')
  nextQuestion.id = 'NextQuestion'
  if(i<numberOfQuestions){
    nextQuestion.textContent = `Next Question`
    nextQuestion.classList.add('btn', 'btn-primary', 'position-static', 'm-2')}
  else{
    nextQuestion.textContent = `Finish Quiz`
    nextQuestion.classList.add('btn', 'btn-secondary', 'position-static', 'm-2')
  }
  nextQuestion.style.display = "none";
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
  img.width = 150
  label.appendChild(img)

}

function getCountries(){
  console.log(scores)
  if(i<numberOfQuestions+1){
    question.innerHTML = ""
    options.innerHTML = ""
    submitButton.innerHTML = ""
    result.innerHTML = ""
    next.innerHTML = ""
    
    fetchCountries(level, region, numberRequests)}
  else{
    console.log(scores)
    let scoretext = document.createElement('p')
    scoretext.textContent =`Yout score is ${scores}`
    options.appendChild(scoretext)
  }
}

function checkAnwser(e){
  e.preventDefault()
 
  let answer = undefined


  result.innerHTML=""
  let displayResult = document.createElement('p')
  
  for(j = 0 ; j < radioButtons.length; j++){
    if(radioButtons[j].checked){
      answer = radioButtons[j].value
      break
    }
  }
  
  if(answer == trueAnswer.ID){
    displayResult.textContent = 'Right Answer'
    scores.push(10)
    console.log('right answer')
  }else{
    console.log('wrong answer')
    displayResult.textContent = 'Wrong Answer'
  }

result.appendChild(displayResult)
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
    console.log(response.status)
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

