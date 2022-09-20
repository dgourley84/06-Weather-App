//Global const
const cityInput     = document.getElementById('search-input');  //obtain input from HTML
const previousInput = document.getElementById('previous-list'); //obtain input from previous selection.
const displayCity   = document.getElementById('display-city');  //element for the display of the city name
const displayDate   = document.getElementById('display-date');  //element for the display of the date
const displayTemp   = document.getElementById('display-temp');  //element for the display of the temp
const displayHum    = document.getElementById('display-hum');   //element for the display of the humidity
const displayWind   = document.getElementById('display-wind');  //element for the display of wind
const displayWindD  = document.getElementById('display-windD'); //element for the display of the UV
const submitCity    = document.getElementById('search-submit'); //button for search submission
const currentDate   = moment().format("dddd, MMMM Do YYYY, h:mm a"); // current time and date

const APIKey        = 'aef8ff579a371781a816a273903f8295'; //api key for the first call to get lat long
const APIKySecond   = '3e577ad9e250c4dd28d83578156049cc'; //api key for the second call to get weather
// const dayCount = 6; // input number of days to present, current plus future day count 1 + 5 = 6 

let cityList = []; // list of cities previously searched

//create time and date function and present as part of city selected header
function addTime(){
    console.log(currentDate);    
    var currentDateEL = document.createElement('p')
    currentDateEL.textContent = currentDate;
    displayDate.append(currentDateEL);
};

//create name of city in weather box for inputted city
function CityName (){
    var storedCitiesEL = document.createElement('p')
    storedCitiesEL.textContent = cityInput.value;
    displayCity.innerHTML = storedCitiesEL.textContent;

}


//Search function
// Attempt to get the user's search of city data if it exists
function getUserCityChoice(){

    var CityQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" +cityInput.value+ "&limit=1&appid=" + APIKey;

    console.log(CityQueryURL);

    return fetch(CityQueryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        console.log(result);
        const lat = result[0].lat;
        console.log(lat);
        const lon = result[0].lon;
        console.log(lon);

    var QueryURLLonLat = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=hourly,minutely&appid=" + APIKySecond;
    console.log(QueryURLLonLat);

    return fetch(QueryURLLonLat)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        console.log(result);

        let date = result.daily[0].dt; // date - dt field
        console.log('date[0] = ', date );
        let temp = result.daily[0].temp.day; // temp - temp
        console.log('temp[0] = ', temp );
        let humidity = result.daily[0].humidity; // humidity - humidity field
        console.log('humidity[0] = ', humidity );
        let windSpeed = []; // wind speed - wind_speed

        let icon = result.daily[0].weather[0].icon; // icon - weather.0.icon
        console.log('icon[0] = ', icon );
        $card = $(); // create card with the above attributes and city name

        //push into current weather card
        //  present in header box on top of page
        
        //create 5 days forecast in mini boxes
        //  iterate over the 5 records to present the forecast weather.

    })
    }) 
}

var storeCityList = function(event){
    // event.preventDefault();

    if(localStorage.getItem('cityList')){
        // //get current local storage values
        var storedCities = JSON.parse(localStorage.getItem('cityList'));
        //add new city to city list
        storedCities.push({name: cityInput.value});
        cityList = storedCities;
        //saving amended array to local storage
        localStorage.setItem('cityList',JSON.stringify(storedCities));
    }
    else {
        var storedCities = [{name: cityInput.value}]
        localStorage.setItem('cityList', JSON.stringify(storedCities));
    }
    console.log('StoreCityLength', cityList.length)
}

function displayCityList(event){
    previousInput.innerHTML = "";
console.log('cityLengthinDisplayCities', cityList.length)
    // Start at end of history array and count down to show the most recent at the top.
    for (var i = cityList.length -1 ; i >= 0; i--) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        // btn.setAttribute("aria-controls", "today forecast");
        btn.classList.add("history-btn", "btn-history");
  
        // `data-search` allows access to city name when click handler is invoked
        btn.setAttribute("data-search", cityList[i]);
        btn.textContent = cityList[i].name;
        previousInput.append(btn);
    }
}

function appendToHistory(search) {
    // If there is no search term return the function
    if (cityList.indexOf(search) !== -1) {
      return;
    }
    cityList.push(search);
  
    localStorage.setItem('search-history', JSON.stringify(cityList));
    storeCityList(search);
}

function initSearchHistory() {
    var storedCityList = localStorage.getItem('cityList');
    if (storedCityList) {
        cityList = JSON.parse(storedCityList);
        console.log(cityList);
    }
    let event;
    displayCityList(event);
}


addTime(); // add time to page so the user can determine the request time


//upon clicking search in the city button the following should happen:
//1. Take the City name value and push to the display city span
//      this is done as a header for the current weather box
submitCity.addEventListener('click', function(event) {
    CityName();
    storeCityList(event);
    displayCityList(event);
    getUserCityChoice();
});

//2. Take the City name value and push into the api call in getUserChoice
//      this is done to obtain the lat and long so the call can get the info
// submitCity.addEventListener('click', getUserCityChoice);
//3. Save the value to localStorage
//      this is done so item 4 has values to present
// submitCity.addEventListener('click', storeCityList);
//4. Present the value as a button in the previous-list table
//      store city name so that the search can be redone without typing in again
//      present the historical search on side bar so that it can be selected
//      present this in reverse order
// submitCity.addEventListener('click', displayCityList);




initSearchHistory();


//in the list of previous searches when user clicks on item the following happens:
//1. take the city name value and push to the display city span
//      this will then update the the header for the current weather box
//2. take the city name value and push into the api call in the getUserChoice
//      this is done to once again obtain the lat and the lon
//3. refresh the list in the previous values to put the item at the top
//      store city name so that the search can be redone without typing in again
//      present the historical search on side bar so that it can be selected
//      present this in reverse order

//The results for both of the above obtain:
// temp - temp
// humidity - humidity field
// wind speed - wind_speed
// date - dt field
// icon - weather.0.icon


