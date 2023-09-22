
const query = document.querySelector("#level")

query.addEventListener('submit', redirect)


//functions
function redirect(e){
  e.preventDefault()
  const [level, region, numberOfQuestions, username, numberRequests] = [e.target.level.value , e.target.region.value, e.target.nQuestions.value, e.target.username.value, "4"];
  let url = `flag_questions.html?level=${level}&region=${region}&nQuestions=${numberOfQuestions}&username=${username}&nRequest=${numberRequests}`
  location.href = url

  }

