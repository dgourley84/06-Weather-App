//Global const
const cityInput     = document.getElementById('search-input');  //obtain input from HTML
const previousInput = document.getElementById('previous-list'); //obtain input from previous selection.
const displayCity   = document.getElementById('display-city');  //
const displayDate   = document.getElementById('display-date');  
const displayTemp   = document.getElementById('display-temp');
const displayHum    = document.getElementById('display-hum');
const displayWind   = document.getElementById('display-wind');
const displayUV     = document.getElementById('display-UV');  
const submitCity    = document.querySelector('#search-submit');



const APIKey = 'aef8ff579a371781a816a273903f8295';


const userCity = ""; // this is the users city selection
const newCity = {}; // the city to be added history list




let cityList = []; // list of cities previously searched


//Search function
// Attempt to get the user's search of city data if it exists

// function getUserCityChoice(city){

//     // var inputNewCity = {};

//     // var count = 6;

//     var CityQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=brisbane&appid=" + APIKey;

//     console.log(CityQueryURL);

//     return fetch(CityQueryURL)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(result){
//         return{
//             lon: result.city.coord.lon,
//             lat: result.city.coord.lat,
//         }
//     })
//     .then(function(result){
//         var QueryURLLonLat = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

//         return fetch(QueryURLLonLat);
//     })
//     .then(function(result){
//         return result.json();
//     })
// }



// getUserCityChoice();



// store city name so that the search can be redone without typing in again

function storeCityList (event){
    event.preventDefault();
    if(localStorage.getItem('cityList')){
        //get current local storage values
        var storedCities = JSON.parse(localStorage.getItem('cityList'));
        //add new city to city list
        storedCities.push({name: cityInput.value});
        //saving amended array to local storage
        localStorage.setItem('cityList',JSON.stringify(storedCities));

        //loop over the values in the stored list
        for (let index = 0; index < storedCities.length; index++){
            
            const element = storedCities[index];

            const cityNameElement = document.createElement('<li>');
            cityNameElement.innerHTML = element.name;

            document.getElementById('previous-list').appendChild(cityNameElement)     
        }
    } else {
        var storedCities = [{name: cityInput.value}]
        localStorage.setItem('cityList', JSON.stringify(storedCities));
    }
}

submitCity.addEventListener('submit',storeCityList);


// $(document).on('click','.search-submit', function(event){
//     //when user clicks search button
//     //saves the text to local storage
//     const searchClicked = $(event.target);
//     //saves text input
//     const searchText = searchClicked.parent.prev().children();
//     // saves the value of the text input
//     const userInput = searchText.val();

//     localStorage.setItem(userInput);

// })

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

