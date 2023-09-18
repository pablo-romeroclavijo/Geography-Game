const query = document.querySelector("#level")
const question = document.querySelector('#question')
const options = document.querySelector('#options')

query.addEventListener("submit", getCountries)

//functions

function createQuestion(data){
  const countries = data
  const randomIndex = Math.floor(Math.random()*countries.length)
  const answer = countries[randomIndex]
  console.log(answer)

  for(country in countries){
    let ID = countries[country].ID
    let type = 'flags'
    console.log(ID, type)
    fetchImage(type, ID)
  }

}

function addImage(url){
  let input = document.createElement('input')
  input.type = 'radio'
  options.appendChild(input)

  let label = document.createElement('label')
  label.setAttribute('for', "input")
  options.appendChild(label)

  let img = document.createElement('img')
  img.src = url
  label.appendChild(img)

}


function getCountries(e){
  e.preventDefault()
  const [level, region, numberRequests] = [e.target.level.value , e.target.region.value, "4"];
  fetchCountries(level, region, numberRequests)
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


async function fetchImage(type, ID, country) {
  
  //Make sure to add your deployed API URL in this fetch
  // try {
    const response = await fetch(`http://localhost:3000/image/${type}/${ID}`);
    if(response.ok){
      const imageBlob = await response.blob()
      const imageURL = URL.createObjectURL(imageBlob)
      console.log(imageURL)
      addImage(imageURL)
    }
    else {throw 'Error status: ' + res.status}
  }
  // catch(e){console.log('error at  catch')}
// }