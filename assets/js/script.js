var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input').value;
var APIKey = "2871ad72202319cf561e97ce31c20f63";
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchBtn = document.querySelector('#btn');



function printResults(resultObj) {
    console.log(resultObj);

    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    var cityName = document.createElement('h3');
    cityName.textContent = resultObj.name;

    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML = resultObj.name;

    if (resultObj.name) {
        bodyContentEl.innerHTML += resultObj.name.join();
    } else {
        bodyContentEl.innerHTML += 'No subject for this entry.';
    }

    resultBody.append(cityName, bodyContentEl);

    resultContentEl.append(resultCard);
};


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


            if (!dataRes.name) {
                console.log('No results found!');
                resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                resultContentEl.textContent = '';
                printResults(dataRes);
            }
        }
            .catch(function (error) {
                console.error(error);
            })
)}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error('Please enter you search');
        return;
    }

    searchApi(searchInputVal);
}

searchBtn.addEventListener('click', handleSearchFormSubmit); 