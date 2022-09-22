# 06-Weather-App
Create a weather app usingthe 5 Day Weather Forecast (Links to an external site.) to retrieve weather data for cities.

This project has been deployed to GitHub pages. To access this project click the deployement link below:

https://github.com/dgourley84/06-Weather-App

Or, download the source files to use as a template.

# Getting Started
This project has been deployed to GitHub Pages. To access this project click the deployment link below. Or, download the sources files to use this as a template.

- https://github.com/dgourley84/06-Weather-App
- https://dgourley84.github.io/06-Weather-App/


# Pre-requisites
If you wish to use this as a template you will need a text editor. Visual Studio Code was used to create this project and is the recomended application.

# Installing
To install this code, download the zip file, or use GitHub's guidelines to clone the repository.

# Summary
This project utilises jquery, bootstrap & moment.js to create a weather app that allows user to input a city in the world, and then present them with the following information for the current day and also 5 day forecast:

- City name;
- date;
- icon of the conditions;
- temperature;
- the humidty;
- and the wind speed.

It also logs the users search into a list of cities searched so that the user is able to simply click a prior searched city and be presented with the results.

Upon opening the app the user is presented with the following landing page:

![LandingPage](./assets/images/LandingPage.png)

# Features
This project has the following features:

## City search bar
As part of the function the user is presented with an input box in which to type a city name to search

![SearchBox](./assets/images/SearchBox.png)

When a search is complete it logs the item into local storage to be accessed in the below section.

## Previous Searched cities
The user is also presented with a list of historically searched cities with the most recent search at the top.

![PreviousSearchs](./assets/images/PreviousSearchItems.png)

This section access local storage gets the historical searched city and presents as a list.

## Current and 5 Day forecast section

The results of the searched city are presented in this section.

![Results](./assets/images/SearchResults.png)

# Functionality
In order to create the above features the code performs as follows:

Upon clicking "search" in the city button the following happens:
1. Take the City name value and push to the display city span. This creates a header for the current weather box;
2. Take the City name value and push into an api call in getUserChoice this is done to obtain the lat and long so that a second call can be performed with these values to get the 5 day forcast;
3. Save the value to localStorage this is done so that the values can then be presented to users for previous searches
4. Present the value as a button in the previous-list table store city name so that the search can be redone without typing in again present the historical search on side bar so that it can be selected present this in reverse order

![ClickSearchButton](./assets/images/ClickSearchButton.png)

If a user clicks on a previously searched city button the above functionality is performed, however the code will pull the previously searched city using the following code:

![PreviousSearchCode](./assets/images/PreviousSeachButton.png)

this will then replace the first API call with this previous value and recycle step 2. It will not perform steps 3 and 4 since the city will be in the list already.

# To excute file
Open in brower and either click on a searched city item or type a city name and search.

# File features
- one HTML page "index.html"
- one CSS page "style.css"
- one Javascript page "script.js"
- use of the following third party API's
    -   moment.js - https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js
    -   bootstrap - https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css
    -   google fonts - https://fonts.googleapis.com/
    -   jquery - https://code.jquery.com/jquery-3.4.1.min.js
-   use of the following serverside API's
    - City API Call openweathermap - "https://api.openweathermap.org/geo/1.0/direct?q=" +cityInput.value+ "&limit=1&appid=" + APIKey;
    - Lat lon API Call openweathermap - "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=hourly,minutely&appid=" + APIKySecond;

# Authors
- Dallas Gourley
- Various code found online and repurposed to fit requirements

# Acknowledgements
Thanks to Sam Ngu, Evan Woods and Suresh S Kumar for tutorial guidence and inspiration.

