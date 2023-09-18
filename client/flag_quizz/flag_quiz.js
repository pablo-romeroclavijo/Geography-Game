const query = document.querySelector("#level")

query.addEventListener("submit", getCountries)

//functions

function createQuestion(e){
  console.log('running')
  e.preventDefault()
  const countries = data
  console.log(countries)
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
        console.log(data)
    }
    else {throw 'Error status: ' + resp.status}
  }
  catch(e){console.log('error at  catch')}
}


