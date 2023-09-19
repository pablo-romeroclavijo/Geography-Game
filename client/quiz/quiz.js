
const question = document.querySelector("#questions")
const setting = document.querySelector("#setting")
const submit = document.querySelector("#answerSubmit")
const worldMap = document.querySelector("#worldMap")
const optionSelect = document.querySelector("#options")

setting.addEventListener("submit",getCountries)

let id
let countries = {}


function startQuiz(q){
  const randomIndex = Math.floor(Math.random()*q.length)
  console.log(randomIndex)
  let id;
  id = q[randomIndex].ID
  console.log(id)
  fetchImage("maps",id)
  q.forEach(element => {
    console.log(element)
    generateOption(element.name,element.ID)
  })
}
function generateOption(name,id){
  console.log(name)
  let option1 = document.createElement("input")
  option1.type = "radio"
  option1.id = id
  option1.name = name
  console.log(option1)
  optionSelect.appendChild(option1)
 
  let label = document.createElement('label')
  console.log(option1)
  label.setAttribute('for', option1.id)
  label.textContent = name
  optionSelect.appendChild(label)
}

function addImage(url){
  let map = document.createElement("img")
  map.src = url
  map.width = 1500
  worldMap.appendChild(map)
}

function getCountries(e){
  e.preventDefault()
  worldMap.innerHTML = ""
  optionSelect.innerHTML = ""
  submit.innerHTML = ""
  

  const [level, region, numberRequests] = [e.target.level.value , e.target.region.value, "4"];
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


  