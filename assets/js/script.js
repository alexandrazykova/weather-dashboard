var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input').value;
var APIKey = "2871ad72202319cf561e97ce31c20f63";

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');


function printResults(resultObj) {
    console.log(resultObj);
}

function searchApi(searchInputVal) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputVal + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (dataRes) {

            console.log(dataRes);


            if (!dataRes.results.length) {
                console.log('No results found!');
                resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                resultContentEl.textContent = '';
                for (var i = 0; i < dataRes.results.length; i++) {
                    printResults(dataRes.results[i]);
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('Please enter you search');
        return;
    }

    searchApi(searchInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);