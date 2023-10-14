var searchFormEl = document.querySelector('#search-form');
var APIKey = "2871ad72202319cf561e97ce31c20f63";
var current = document.querySelector('#current');
var forecast = document.querySelector('#forecast');
var searchBtn = document.querySelector('#btn');
var searchInputEl = document.querySelector('#search-input');
var searchHistoryEl = document.querySelector('#search-history');
var forecastEl = document.querySelector(".forecast");
var storeHistory = [];

/* API fetch
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

                if (!store.includes(searchInputVal)) {
                    store = [searchInputVal, ...store];
                    localStorage.searchHistory = JSON.stringify(store);
                    getStore();
                };

                if (!dataRes.name) {
                    console.log('No results found!');
                    resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
                } else {
                    resultContentEl.textContent = '';
                    printResults(dataRes);
                }
            })

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`
        fetch(forecastUrl)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                displayForecast(data.list)
            })
    } catch (error) {
        console.log(error);
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

        
        var dateEl = document.createElement('p');
        dateEl.textContent = "Date " + resultObj.coord.date;

        var weatherIconEl = document.createElement('img');
        weatherIconEl.src = "http://openweathermap.org/img/w/" + resultObj.weather[0].icon + ".png";

     
        var tempEl = document.createElement('p');
        tempEl.textContent = "Temperature: " + resultObj.main.temp;

       
        var humidityEl = document.createElement('p');
        humidityEl.textContent = "Humidity: " + resultObj.main.humidity;

    
        var windEl = document.createElement('p');
        windEl.textContent = "Wind speed: " + resultObj.wind.speed;

        // Appends all the results on the page
        resultBody.append(cityName);
        resultBody.append(bodyContentEl);
        resultBody.append(weatherIconEl);
        resultBody.append(tempEl);
        resultBody.append(humidityEl);
        resultBody.append(windEl);
        resultBody.append(dateEl);

    };

    function displayForecast(forecastData) {
        forecastEl.innerHTML = ""
    // var fiveForecast = document.createElement("h5");
    // fiveForecast.textContent = "5-Day Forecast:";
    // forecastEl.append(fiveForecast);

        for (let i = 0; i < 7; i++) {

            const card = document.createElement("div")
            card.setAttribute("class", "card forecast-card")
            const cardHeader = document.createElement("div")
            cardHeader.setAttribute("class", "card-header")
            const cardBody = document.createElement("div")
            cardBody.setAttribute("class", "card-body")
            const span = document.createElement("span")
            const icon = document.createElement("img")
            icon.setAttribute("src", "https://openweathermap.org/img/w/" + forecastData[i].weather[0].icon + ".png")
            const h2 = document.createElement("h4")
            h2.setAttribute("class", "city-name")
            const temp = document.createElement("p")
            const humid = document.createElement("p")
            const wind = document.createElement("p")
            const forDate = i * 8 + 4
            const day = new Date(forecastData[forDate].dt * 1000).toDateString()
            h2.textContent = day
            temp.textContent = `Temp:${Math.round(forecastData[i].main.temp)}`
            humid.textContent = `Humidity: ${forecastData[i].main.humidity}`
            wind.textContent = `Wind Speed: ${forecastData[i].wind.speed}`

            span.appendChild(icon)
            h2.append(span)
            cardHeader.append(h2)
            cardBody.append(temp, humid, wind)
            card.append(cardHeader, cardBody)
            forecastEl.append(card)

        }
        printForecastResults(forecastData)

    }


    function handleHistoryBtn(city) {
        searchInputEl.value = city;
        handleSearchFormSubmit()
    }
    function getStore() {
        if (localStorage.searchHistory) {
            store = JSON.parse(localStorage.searchHistory);

            searchHistoryEl.innerHTML = '';

            store.forEach(city => {
                var btn2 = document.createElement('button');
                btn2.addEventListener('click', function () { handleHistoryBtn(city) })
                btn2.innerText = city;
                searchHistoryEl.appendChild(btn2);
            });
        } else {
            store = [];
        }
    };

    getStore();

    // Saves the city name to local storage
    function displaySavedCity() {
        searchHistoryEl.innerHTML = "";
    var savedCity = JSON.parse(localStorage.getItem('savedCity')) || [];
    if (!savedCity.includes(data.name)) {
        savedCity.push(data.name);
        localStorage.setItem('savedCity', JSON.stringify(savedCity));

    }}
        
        displaySavedCity();
    

    // function displaySavedCity() {
    //     searchHistoryEl.innerHTML = "";
    //     var savedCity = JSON.parse(localStorage.getItem("savedCIty")) || [];

    // }


}

// Search for 5-day forecast of the selected city
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
                //console.log(dataRes.list[7].main.temp);

                for (var i = 7; i < dataRes.list.length; i += 8) {
                    console.log(dataRes.list[i].main.temp);
                }

            })
    } catch (error) {
        console.log(error);
    }
}

// Displays 5-day forecast of the selecred city
function printForecastResults(dataRes) {

    var forecastCard = document.createElement('div');
    forecastCard.classList.add('card');
    resultContentEl.append(forecastCard);

    var forecastBody = document.createElement('div');
    forecastBody.classList.add('card-body');
    forecastCard.append(forecastBody);

    var forecastContentEl = document.createElement('p');
    var forecastTempEl = document.createElement('p');
    forecastTempEl.textContent = "Temperature: " + dataRes.main.temp;

    forecastBody.append(forecastTempEl);

}

// Handling input search
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

// Function to handle history button click
function handleHistoryBtn(city) {
    searchInputEl.value = city;
    searchForecast(city);
}


// Event listener for the button
searchBtn.addEventListener('click', handleSearchFormSubmit);

printForecastResults();
*/