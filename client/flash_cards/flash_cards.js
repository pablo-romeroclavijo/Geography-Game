const query = document.querySelector("#level")
const map = document.querySelector('#map')
const info = document.querySelector('#info')
const name = document.querySelector('#name')
const flashCard = document.querySelector('#flashCard')



query.addEventListener("submit", getCountry)

flashCard.style.display = 'none'
let trueAnswer = undefined

//functions

function createFlashCard(data){

const country = document.createElement('div')
const reg = document.createElement('div')
const curr = document.createElement('div')

country.textContent = `${data.name}`
country.classList.add('flex-item', 'h1' )
country.style.background = "#8A4FFF"
name.appendChild(country)


reg.textContent = `Region: ${data.region}`
reg.classList.add('flex-item', 'fs-2', "p-3")
curr.textContent = `Currency: ${data.currency}`
curr.classList.add('flex-item', 'fs-2', "p-3")

fetchImage('flags', data.ID)

info.appendChild(reg)
info.appendChild(curr)



fetchImage('maps', data.ID)
}

function addImage(url, ID, type){
  let img = document.createElement('img')
  img.src = url
  
  if(type == 'maps'){
    img.id = `map${ID}`
    img.width = 1450
    img.classList.add('m-3')
    map.appendChild(img)
  }else{

    img.width = 150
    img.classList.add('p-3')
    info.appendChild(img)
    
    
  }
}


function getCountry(e){
  e.preventDefault()
  flashCard.style.display = 'block'
  info.innerHTML = ""
  map.innerHTML = ""
  name.innerHTML = ""

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