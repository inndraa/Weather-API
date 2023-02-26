const form = document.querySelector('.form');
const searchInput = document.querySelector('.search__input');
const container = document.querySelector('.container');
const apiKey = '5de21f4b99954c66b43140618232502';

function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove()
}

function showError(errorMessage) {
    const errorText = `<p style="color: lightred">${errorMessage}</p>`
    container.insertAdjacentHTML('afterend', errorText)
}

function showCard(icon, country, location, currTempC, currTempF, feelLikeC, feelLikeF, region, localtime, weather, humidity, windKph, windMph) {
    const card = `<div class="card" style="width: 18rem;">
    <img src="${icon}" class="card-img-top" alt="...">  
    <div class="card-body">
        <div class="card-head d-flex align-items-center gap-2">
            <h5 class="m-0 p-0 card-title fw-bold">${country}, ${location} </h5>
        </div>
        <hr class="mt-3 mb-3">
        <div class="card-text">
            <p class="m-0 text-muted"> <span class="text-primary">${currTempC}℃</span> (${currTempF}°F)</p>
            <p class="m-0 text-muted">Feels like: ${feelLikeC}℃ (${feelLikeF}°F)</p>
            <p class="m-0 text-muted">${region}</p>
            <p class="m-0 text-muted">Local time: ${localtime}</p>
            <p class="m-0 p-0 card-weather-overall text-muted">Weather: ${weather}</p>
            <p class="m-0 text-muted">Humidity: ${humidity}%</p>
            <p class="m-0 text-muted">Wind: ${windKph} km/h (${windMph} mph)</p> v
        </div>
    </div>
</div>`
    container.insertAdjacentHTML('afterend', card)
}

function removeError(){
    if (errorText) errorText.remove()
}

form.onsubmit = async (e) => {
    e.preventDefault();
    let city = searchInput.value.trim();
    const data = await getData(city)
    async function getData(city) {
        const query = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const response = await fetch(query);
        const data = await response.json();
        return data;
    }
    if (data.error) {
        removeCard();
        showError(data.error.message);
        searchInput.value = '';
    } else {
        removeError()
        showCard(data.current.condition.icon, data.location.country, data.location.name, data.current.temp_c, data.current.temp_f, data.current.feelslike_c, data.current.feelslike_f, data.location.region, data.location.localtime, data.current.condition.text, data.current.humidity, data.current.wind_kph, data.current.wind_mph);
        
    }
}
;