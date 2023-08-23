var searchFormEl = document.querySelector('#search-form');
var APIKey = "2871ad72202319cf561e97ce31c20f63";
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.getElementById('result-content');
var searchBtn = document.querySelector('#btn');
var searchInputEl = document.querySelector('#search-input');
var searchHistoryEl = document.querySelector('#search-history');

// Function to save the search history
function saveSearchHistory(cityName) {
    var historyItem = document.createElement('div');
    historyItem.textContent = cityName;
    searchHistoryEl.prepend(historyItem);
}

// Displays received results on the page
function printResults(resultObj) {
    console.log(resultObj);

    // set up elements to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card');
    resultContentEl.append(resultCard);

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    var cityName = document.createElement('h3');
    cityName.textContent = "City: " + resultObj.name;

    var bodyContentEl = document.createElement('p');
    var dateEl = document.createElement('p');
    dateEl.textContent = "Date " + resultObj.coord.date;

    var bodyContentEl = document.createElement('p');
    var weatherIconEl = document.createElement('p');
    weatherIconEl.textContent = "Icon: " + resultObj.weather[0].icon;

    var bodyContentEl = document.createElement('p');
    var tempEl = document.createElement('p');
    tempEl.textContent = "Temperature: " + resultObj.main.temp;

    var bodyContentEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    humidityEl.textContent = "Humidity: " + resultObj.main.humidity;

    var bodyContentEl = document.createElement('p');
    var windEl = document.createElement('p');
    windEl.textContent = "Wind speed: " + resultObj.wind.speed;

    resultBody.append(cityName);
    resultBody.append(bodyContentEl);
    resultBody.append(weatherIconEl);
    resultBody.append(tempEl);
    resultBody.append(humidityEl);
    resultBody.append(windEl);
    resultBody.append(dateEl);

};


function searchApi(searchInputVal) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputVal + "&appid=" + APIKey + "&units=metric";

    try {

        fetch(queryURL)
            .then(function (response) {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(function (dataRes) {
                console.log(dataRes.name);


                if (!dataRes.name) {
                    console.log('No results found!');
                    resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
                } else {
                    resultContentEl.textContent = '';
                    printResults(dataRes);
                    saveSearchHistory(dataRes.name);

                }
            })
    } catch (error) {
        console.log(error);
    }
}

function searchForecast(cityName) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=metric`;

    try {

        fetch(forecastUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(function (dataRes) {
                console.log(dataRes);
                console.log(dataRes.list[7].main.temp);

                for (var i = 7; i < dataRes.list.length; i += 8) {
                    console.log(dataRes.list[i].main.temp);
                }

            })
    } catch (error) {
        console.log(error);
    }

}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = searchInputEl.value;

    if (!searchInputVal) {
        console.error('Please enter you search');
        return;
    }

    searchApi(searchInputVal);
    searchForecast(searchInputVal);
    searchInputEl.value = '';
}

searchBtn.addEventListener('click', handleSearchFormSubmit); 