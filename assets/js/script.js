var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input').value;
var APIKey = "2871ad72202319cf561e97ce31c20f63";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputVal + "&appid=" + APIKey;
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

// Get the search params out of the URL
function getParams() {
    var searchParamsArr = document.location.search.split("&");

    // Get the query and format values   
    var query = searchParamsArr[0].split("=").pop();
    var appid = searchParamsArr[1].split("=").pop();

    searchApi(query, appid);
}

function printResults(resultObj) {
    console.log(resultObj);
}

function searchApi(query, appid) {

    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (dataRes) {
            resultTextEl.textContentEl = dataRes.search.query;

            console.log(locRes);

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

        })
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;
    var formatInputVal = document.querySelector('#format-input').value;

    if (!searchInputVal) {
        console.error('Please enter you search');
        return;
    }

    searchApi(searchInputVal, formatInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();