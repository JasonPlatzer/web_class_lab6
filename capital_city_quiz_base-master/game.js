let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let startAgain = document.querySelector('#start-again')


// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

//console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 


let answer
let city
let countryName

// TODO when the page loads, select an element at random from the countriesAndCodes array

// putting almost everything in a function to call again
// renamed this function because it sets up one round of the game 
function startGame(){
  // from https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
  let random = Math.floor(Math.random() * countriesAndCodes.length)
  // TODO display the country's name in the randomCountryElement 

  let country = countriesAndCodes[random].name
  // displaying the country to guess on the page
  randomCountryElement.innerHTML = country
  // getting the country code of the country to guess
  let countryCode = countriesAndCodes[random]["alpha-2"]

  // checking api for the correct info based on country code
  let url = ` https://api.worldbank.org/v2/country/${countryCode}?format=json`


// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"


    // still part of function
    // gets the info from api and puts into JSON then extracts the info needed    
    fetch(url).then((res) =>{
        return res.json()
      //  console.log(res)
    }).then((capitol) =>{
        console.log(capitol)
        // I got help from a tutor and this is how he extracted info I got it without using forEach

        capitol.forEach(function(){
          // getting the city name
            city = capitol[1][0].capitalCity

            // getting country name
             countryName = capitol[1][0].name
            // the tutor helped me with the suggestion of putting the event listener here
            // adding event listener moved outside this function
        })
       }).catch((err) =>{
        console.log('!Error ', err)
      })

}
// calling function to begin program
startGame()
startAgain.addEventListener('click', function(){
  // clearing fields and calling function again if try again button is pressed
    userAnswerElement.value = ''
    resultTextElement.innerHTML = ''
    startGame()
 })


 // event listener added one time
submitButton.addEventListener('click', function(){
  // putting user input into javascript
  answer = userAnswerElement.value
  
  if(city.toUpperCase() == answer.toUpperCase()){
      resultTextElement.innerHTML = `Correct the capital of ${countryName} is ${city}`
  } else {
      resultTextElement.innerHTML = `Wrong the capital of ${countryName} is ${city}`
  }
})
  
    

// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice. 
 