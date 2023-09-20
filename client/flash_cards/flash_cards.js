const query = document.querySelector("#level")
const map = document.querySelector('#map')
const info = document.querySelector('#info')



query.addEventListener("submit", getCountry)


let trueAnswer = undefined

//functions

function createFlashCard(data){

const country = document.createElement('h1')
const reg = document.createElement('p')
const curr = document.createElement('p')

country.textContent = `${data.name}`
country.classList.add('p-1')
info.appendChild(country)

const block = document.createElement('div')
block.classList.add('d-flex', "justify-content-center")
block.id = 'block'
info.appendChild(block)

reg.textContent = `Region: ${data.region}`
reg.classList.add('d-inline-flex', 'fs-2', "p-3")
curr.textContent = `Currency: ${data.currency}`
curr.classList.add('d-inline-flex', 'fs-2', "p-3")


block.appendChild(reg)
block.appendChild(curr)

  

fetchImage('flags', data.ID)
fetchImage('maps', data.ID)
}

function addImage(url, ID, type){
  const block =document.querySelector('#block')
  let img = document.createElement('img')
  img.src = url
  
  if(type == 'maps'){
    img.id = `map${ID}`
    img.width = 1500
    img.classList.add('m-3')
    map.appendChild(img)
  }else{

    img.id = `flag${ID}`
    img.width = 150
    img.classList.add('p-3')
    block.appendChild(img)}
}


function getCountry(e){
  e.preventDefault()
  info.innerHTML = ""
  map.innerHTML = ""

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