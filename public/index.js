const weatherForm = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');
let map;
let marker;

weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(weatherForm);
    const location = formData.get('location');
    const response = await fetch(`/weather?location=${encodeURIComponent(location)}`);
    const data = await response.json();
    displayWeatherData(data);

    map.setView([data.latitude, data.longitude], 5);

    if (marker) {
        marker.setLatLng([data.latitude, data.longitude]);
    } else {
        marker = L.marker([data.latitude, data.longitude]).addTo(map);
    }
});

function displayWeatherData(data) {
    weatherInfo.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h2>${data.location}</h2>
                <p>Temperature: ${data.temperature} °C</p>
                <p>Description: ${data.description}</p>
                <img src="http://openweathermap.org/img/w/${data.icon}.png" alt="${data.description}" />
                <p>Longitude: ${data.longitude}</p>
                <p>Latitude: ${data.latitude}</p>
            </div>
            <div class="col-md-6">
                <p>Feels Like Temperature: ${data.feels_like_temperature} °C</p>
                <p>Humidity: ${data.humidity}%</p>
                <p>Pressure: ${data.pressure} hPa</p>
                <p>Wind Speed: ${data.wind_speed} m/s</p>
                <p>Country code: ${data.country_code}</p>
            </div>
        </div>
      `;
    if (!map) {
        map = L.map('map').setView([data.latitude, data.longitude], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(map);
    }
}