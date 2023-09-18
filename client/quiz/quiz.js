const qmap = document.querySelector("#map")


  showmap()

    function showmap(){
      const image = document.createElement("img")
      image.src = `../../server/assets/Maps/m25.png`
      image.width = 1500
      qmap.appendChild(image)
    }
    
    
createNewOptions()

function genarateMap(question,answer){
    

}


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



  