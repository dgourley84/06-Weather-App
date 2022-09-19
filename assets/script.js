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

const APIKey        = 'aef8ff579a371781a816a273903f8295';

const dayCount = 6; // input number of days to present, current plus future day count 1 + 5 = 6 

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
    displayCity.append(storedCitiesEL);
}

//Search function
// Attempt to get the user's search of city data if it exists
function getUserCityChoice(){

    var CityQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=brisbane&limit=1&appid=" + APIKey;

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

    var QueryURLLonLat = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&cnt=" + dayCount + "&appid="+ APIKey;
    console.log(QueryURLLonLat);

    return fetch(QueryURLLonLat)
    .then(function(response){
        return response.json();
    })
    .then(function(result){
        console.log(result);

        const currentTemp = [];
        result.list.forEach(record => {
            currentTemp.push(record.main.temp)
        });        
        console.log(currentTemp);
        var currentTempEL = document.createElement('p')
        currentTempEL.textContent = currentTemp;
        displayTemp.append(currentTempEL);

        const currentHum = [];
        result.list.forEach(day => {
            currentHum.push(day.main.humidity)
        });        
        console.log(currentHum);
        var currentHumEL = document.createElement('p')
        currentHumEL.textContent = currentHum;
        displayHum.append(currentHumEL);

        const currentWind = [];
        result.list.forEach(day => {
            currentWind.push(day.wind.speed)
        });        
        console.log(currentWind);
        var currentWindEL = document.createElement('p')
        currentWindEL.textContent = currentWind;
        displayWind.append(currentWindEL);

        const currentWindD = [];
        result.list.forEach(day => {
            currentWindD.push(day.wind.deg)
        });        
        console.log(currentWindD);
        var currentWindDEL = document.createElement('p')
        currentWindDEL.textContent = currentWindD;
        displayWindD.append(currentWindDEL);
    })
    }) 
}

var storeCityList = function(event){
    event.preventDefault();
    if(localStorage.getItem('cityList')){
        //get current local storage values
        var storedCities = JSON.parse(localStorage.getItem('cityList'));
        //add new city to city list
        storedCities.push({name: cityInput.value});
        //saving amended array to local storage
        localStorage.setItem('cityList',JSON.stringify(storedCities));

        //loop over the values in the stored list
        for (let i = cityList.length -1; i >=0; i++){
            const element = storedCities[i];

            const cityNameElement = document.createElement('<li>');

            cityNameElement.innerHTML = element.name;

            document.getElementById('previous-list').appendChild(cityNameElement)     
        }
    } else {
        var storedCities = [{name: cityInput.value}]
        localStorage.setItem('cityList', JSON.stringify(storedCities));
    }
}


//upon clicking search in the city button the following should happen:
//1. Take the City name value and push to the display city span
//      this is done as a header for the current weather box
//2. Take the City name value and push into the api call in getUserChoice
//      this is done to obtain the lat and long so the call can get the info
//3. Save the value to localStorage
//      this is done so item 4 has values to present
//4. Present the value as a button in the previous-list table
//      store city name so that the search can be redone without typing in again
//      present the historical search on side bar so that it can be selected
//      present this in reverse order

addTime(); // add time to page so the user can determine the request time

submitCity.addEventListener('click', storeCityList);
CityName();
getUserCityChoice();


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
// temp
// humidity
// wind speed
// date
// icon

//present header box for current weather
//  present in header box on top of page
//create 5 days forecast in mini boxes
//  iterate over the 5 records to present the forecast weather.

