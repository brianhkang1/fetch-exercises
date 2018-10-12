// Add your code for the numbers API here!
document.addEventListener("DOMContentLoaded", function(){
  fetchC3PO();
  fetchR2D2();
  annualFetchCounter();
  allNumbers();
})

document.querySelector("#crawlBtn").addEventListener('click', function(){
  let crawlDiv = document.querySelector("#crawlDiv")

  if (!crawlDiv.hasChildNodes()){
    fetch("https://swapi.co/api/films/1/")
      .then(response => response.json())
      .then(json => {
        let pElement = document.createElement("p")
        document.querySelector("#crawlDiv").appendChild(pElement)
        pElement.innerText = json.opening_crawl})
  } else {
    crawlDiv.removeChild(crawlDiv.firstChild)}
})

document.querySelector("#planetForm").addEventListener('submit', function(){
  event.preventDefault()
  let input = parseInt(document.querySelector("#planetInput").value)

  if (input < 61 && input > 0){
    fetch(`https://swapi.co/api/planets/${input}`)
      .then(response => response.json())
      .then(json =>
       { let planetName = json["name"]
        let planetClimate = json["climate"]

        if(!document.querySelector("#planetData").hasChildNodes()){
          let pElement = document.createElement("p")
          pElement.id = "planetInfo"
          document.querySelector("#planetData").appendChild(pElement)
        }
        document.querySelector("#planetInfo").innerText = `Planet Name: ${planetName}` + `\n Planet Climate: ${planetClimate}`
      }
      )}
})

function fetchC3PO(){
  fetch("https://swapi.co/api/people/2/")
    .then(response => response.json())
    .then(json => {
      let homeworld = json['homeworld']
      let divElement = document.createElement("div")
      divElement.id = `div-${json["name"]}`
      divElement.innerHTML =
       `<div>Name: ${json["name"]}</div>
       <div>Height: ${json["height"]}</div>
       <div>Mass: ${json["mass"]}</div>
       <form id="form-${json["name"]}"><button type="submit">Show Homeworld Details</button></form> `
    document.querySelector("#droidData").appendChild(divElement)

    document.querySelector(`#form-${json["name"]}`).addEventListener('click', function(event){
      event.preventDefault()
      let c3poButton = document.querySelector("#button-C-3PO")

      fetch("https://swapi.co/api/planets/1/")
        .then(response => response.json())
        .then(json => {
          if(!document.querySelector("#c3poPlanetElement")) {
            let planetName = json["name"]
            let planetClimate = json["climate"]
            let c3poPlanetElement = document.createElement('div')
            c3poPlanetElement.id = "c3poPlanetElement"

            c3poPlanetElement.innerText = `Planet Name: ${planetName}` + `\n Planet Climate: ${planetClimate}`
            document.querySelector("#div-C-3PO").appendChild(c3poPlanetElement)
          } else {
            document.querySelector("#div-C-3PO").removeChild(document.querySelector("#div-C-3PO").lastChild)
          }

      })
    })
  })
}

function fetchR2D2(){
  fetch("https://swapi.co/api/people/3/")
    .then(response => response.json())
    .then(json => {
      let homeworld = json['homeworld']
      let pElement = document.createElement("p")
      pElement.innerText = `\n Name: ${json["name"]} \n Height: ${json["height"]} \n Mass: ${json["mass"]}`
      document.querySelector("#droidData").appendChild(pElement)
    })
}

///////////////////////////////////////////////////////////

document.querySelector("#number-one").addEventListener("click", function(){
  fetch("http://numbersapi.com/1")
    .then(response => response.text())
    .then(text => {
      let divElement = document.createElement('div')
      document.querySelector("#one-facts").appendChild(divElement)
      document.querySelector("#one-facts").innerText = text
    })
})

document.querySelector("#pick-a-number").addEventListener('keyup', function(){
  let input = parseInt(document.querySelector("#pick-a-number").value)

  fetch(`http://numbersapi.com/${input}`)
  .then(response => response.text())
  .then(text => {

    document.querySelector("#random-math-fact").innerText = text
  })
})


function annualFetch(year){
  fetch(`http://numbersapi.com/${year}`)
    .then(response => response.text())
    .then(text =>{
      document.querySelector("#year-history").innerText = text
    })
}

function annualFetchCounter(){
  let year = 2018
  annualFetch(year);
  setInterval(minusOneYear, 5000);

  function minusOneYear(){
    year--
    return annualFetch(year)
  }
}

function allNumbers(){
  document.querySelector("#all-numbers-button").addEventListener('click', function(){
    randomArray = []

    for(var i = 1; i < 101; i++){
      let randomNum = Math.floor(Math.random() * 5000)

      fetch(`http://numbersapi.com/${randomNum}`)
        .then(response => response.text())
        .then(text => {
          let liElement = document.createElement('li')
          liElement.innerText = text
          document.querySelector("#all-the-numbers").appendChild(liElement)
        })
      }

  })
}
