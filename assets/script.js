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


const APIKey        = 'aef8ff579a371781a816a273903f8295';


const userCity = ""; // this is the users city selection
const newCity = {}; // the city to be added history list
const dayCount = 6; // input number of days to present, current plus future day count 1 + 5 = 6



let cityList = []; // list of cities previously searched


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
        result.list.forEach(day => {
            currentTemp.push(day.main.temp)
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

getUserCityChoice();

// function addData (event){
//     cityList.push({
//         name: cityInput.value
//     });
//     localStorage.setItem("CityName", JSON.stringify(cityList));
// };

// submitCity.addEventListener('submit', addData);



// store city name so that the search can be redone without typing in again

// present the historical search on side bar so that it can be selected



//if city is in search then obtain the weather
// for each city obtain:
// temp
// humidity
// wind speed
// date
// icon

//present header box for current weather
//create 5 days forecast in mini boxes

