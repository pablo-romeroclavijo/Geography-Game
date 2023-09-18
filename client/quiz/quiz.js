
const qmap = document.querySelector("#questions")
const setting = document.querySelector("#setting")

setting.addEventListener("submit",getCountries)

let id
let countries = {}

function startQuiz(q){
  q.forEach(element => {
    console.log(element)
    countries[element.name] = element.name
    id = element.ID
  });
  console.log(id)
  console.log(countries)
  showmap(id)
}




function showmap(id){
  const image = document.createElement("img")
  image.src = `../../server/assets/Maps/m${id}.png`
  image.width = 1500
  qmap.appendChild(image)
}
function getCountries(e){
  e.preventDefault()
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



  