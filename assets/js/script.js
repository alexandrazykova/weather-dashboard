// OpenWeatherMap API key and base URL
var APIKey = "f877c697d0476681d60a0669a1a3f94b";
var city;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('search-input');
var myCityEl = document.getElementById('my-city');
var forecastEl = document.getElementById('forecast');
var searchHistory = document.getElementById('search-history');