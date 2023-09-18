const query = document.querySelector("#level")
const question = document.querySelector('#question')
const options = document.querySelector('#options')
const submitButton = document.querySelector('#answerSubmit')
const result = document.querySelector('#result')

query.addEventListener("submit", getCountries)
question.addEventListener('submit', checkAnwser)

let trueAnswer = undefined

//functions

function createQuestion(data){
  const countries = data
  const randomIndex = Math.floor(Math.random()*countries.length)
  trueAnswer = countries[randomIndex]

  let quest = document.createElement('p')
  quest.textContent = `What is the flag of ${trueAnswer.name}`
  options.appendChild(quest)

  for(country in countries){
    let ID = countries[country].ID
    let type = 'flags'
    console.log(ID, type)
    fetchImage(type, ID)
  }
  let button = document.createElement('input')
  button.type = `submit`
  submitButton.appendChild(button)


}

function addImage(url, ID){
  let input = document.createElement('input')
  input.type = 'radio'
  input.id = ID
  input.value = ID
  input.name = 'answer'
  options.appendChild(input)

  let label = document.createElement('label')
  label.setAttribute('for', ID)
  options.appendChild(label)

  let img = document.createElement('img')
  img.src = url
  label.appendChild(img)

}


function getCountries(e){
  e.preventDefault()
  options.innerHTML = ""
  submitButton.innerHTML = ""
  result.innerHTML = ""
  

  const [level, region, numberRequests] = [e.target.level.value , e.target.region.value, "4"];
  fetchCountries(level, region, numberRequests)
}

function checkAnwser(e){
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
  try {
    const response = await fetch(`http://localhost:3000/image/${type}/${ID}`);
    if(response.ok){
      const imageBlob = await response.blob()
      const imageURL = URL.createObjectURL(imageBlob)
      console.log(imageURL)
      addImage(imageURL, ID)
    }
    else {throw 'Error status: ' + res.status}
  }
  catch(e){console.log('error at  catch')}
}