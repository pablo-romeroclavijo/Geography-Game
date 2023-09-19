const query = document.querySelector("#level")
const question = document.querySelector('#questions')
const options = document.querySelector('#options')
const submitButton = document.querySelector('#answerSubmit')
const result = document.querySelector('#result')

query.addEventListener("submit", startQuiz)
question.addEventListener('submit', checkAnwser)


let trueAnswer = undefined
const numberOfQuestions = 10
let i = 1
let scores = []

//functions

function startQuiz(e){
  e.preventDefault()
  const [level, region, numberRequests] = [e.target.level.value , e.target.region.value, "4"];
  const numberOfQuestions = 10
  scores = []
  i = 1

  getCountries(level, region, numberRequests)
  }

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
    console.log(ID, type)
    fetchImage(type, ID)
  }
  let button = document.createElement('input')
  button.type = `submit`
  button.classList.add('btn', 'btn-danger', 'position-static', 'm-2')
  submitButton.appendChild(button)


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

function getCountries(level, region, numberRequests){
  question.innerHTML = ""
  options.innerHTML = ""
  submitButton.innerHTML = ""
  result.innerHTML = ""
  
  fetchCountries(level, region, numberRequests)
}

function checkAnwser(e){
  console.log('checking answer')
  e.preventDefault()
  result.innerHTML = ""
  const answer = e.target.answer.value
  let displayResult = document.createElement('p')
  if(answer == trueAnswer.ID){
    displayResult.textContent = 'Right Answer'
    console.log('right answer')
  }else{
    console.log('wrong answer')
    displayResult.textContent = 'Wrong Answer'
  }
  result.appendChild(displayResult)
}


//requests
async function fetchCountries(level, region, numberRequests) {
  
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
      console.log(imageURL)
      addImage(imageURL, ID)
    }
    else {throw 'Error status: ' + response.status}
  }
  // catch(e){console.log('error at  catch')}
// }