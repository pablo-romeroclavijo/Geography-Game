const query = document.querySelector("#level")
const flashCard = document.querySelector('#flashCard')


query.addEventListener("submit", getCountry)


let trueAnswer = undefined

//functions

function createFlashCard(data){

const country = document.createElement('h1')
const reg = document.createElement('p')
const curr = document.createElement('p')

country.textContent = `${data.name}`
reg.textContent = `Region: ${data.region}`
curr.textContent = `Currency: ${data.currency}`

flashCard.appendChild(country)
flashCard.appendChild(reg)
flashCard.appendChild(curr)

  

fetchImage('flags', data.ID)
fetchImage('maps', data.ID)
}

function addImage(url, ID, type){
  let img = document.createElement('img')
  img.src = url
  
  if(type == 'maps'){
    img.id = `map${ID}`
    img.width = 1500
  }else{
    img.id = `flag${ID}`
    img.width = 150}

  flashCard.appendChild(img)
}


function getCountry(e){
  e.preventDefault()
  flashCard.innerHTML = ""

  const [level, region, numberRequests] = [e.target.level.value , e.target.region.value, "1"];
  fetchCountry(level, region, numberRequests)
}



//requests
async function fetchCountry(level, region, numberRequests) {
  
  //Make sure to add your deployed API URL in this fetch
  // try {
    const response = await fetch(`http://localhost:3000/countries/${level}&${region}&${numberRequests}`);
    if(response.ok){
        const data = await response.json()
        console.log('aaa', data[0])
        createFlashCard(data[0])
    }
    else {throw 'Error status: ' + resp.status}
  }
//   catch(e){console.log('error at  catch')}
// }


async function fetchImage(type, ID) {
  
  //Make sure to add your deployed API URL in this fetch
  try {
    const response = await fetch(`http://localhost:3000/image/${type}/${ID}`);
    if(response.ok){
      const imageBlob = await response.blob()
      const imageURL = URL.createObjectURL(imageBlob)
      console.log(imageURL)
      addImage(imageURL, ID, type)
    }
    else {throw 'Error status: ' + res.status}
  }
  catch(e){console.log('error at  catch')}
}