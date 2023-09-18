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
/*
fetch all the countries
// 




*/
async function createNewOptions(){
  
  const data = {level: "M", region: "AS", numberRequests: "4"};
  const options = {
      method: "POST",
      Headers: {
          "Content-Type”": "application/json"
      },
      body: JSON.stringify(data)
  }
  //Make sure to add your deployed API URL in this fetch
  const response = await fetch(`https://localhost/3000//countries`, options);
  console.log(response)
}

/*
async function fetchCountries(){     // added fetch function to get the reponse from the api and using await/async to make the webiste smooth 
    try{
      const country = await fetch(`http://localhost:3000/countries`);
      if(country.ok){
        const question = await country.json();
        showCountry(question)
      }else{
        throw "Something has gone wrong with the API request"
      }
    }catch(e){
      console.log(e)
      
    }

  }
*/
  