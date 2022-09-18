//Global const
const cityInput = document.querySelector('#search-input'); //obtain input from HTML
const previousInput = document.querySelector('#previous-list'); // obtain input from previous selection
// const APIKey = aef8ff579a371781a816a273903f8295;


const userCity = ""; // this is the users city selection
const newCity = {}; // the city to be added history list
const cityList = []; // list of cities previously searched


//Search function
// Attempt to get the user's search of city data if it exists

function getUserCityChoice(previousCity){

    var inputNewCity = {};

    var count = 6;

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=brisbane&appid=aef8ff579a371781a816a273903f8295&units=metric&cnt=6";

    console.log(queryURL);

}

getUserCityChoice();



// store city name so that the search can be redone without typing in again
function addCityToList(previousCity){
    $inputNewCity= $("<li>");
    $inputNewCity.attr("id",previousCity);
    $inputNewCity.text(previousCity);

    $previousInput.append($inputNewCity);
    cityList.push(newCity);
    console.log(cityList);
}

// present the historical search on side bar so that it can be selected



//if city is in search then obtain the weather
// for each city obtain:
// temp
// humidity
// windspeed
// date
// icon

//present header box for current weather
//create 5 days forecast in mini boxes

