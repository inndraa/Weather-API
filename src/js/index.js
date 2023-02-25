const form = document.querySelector('.form');
const searchInput = document.querySelector('.search__input')
let city;
const apiKey = '5de21f4b99954c66b43140618232502';

form.onsubmit = (e) => {
    e.preventDefault();
    city = searchInput.value.trim();
    const query = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(query).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    })

}

