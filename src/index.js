//API
function displayTemperature(response) {
    // console.log(response.data);

    let temperature = Math.round(response.data.temperature.current);
    let city = response.data.city;
    let humidity = response.data.temperature.humidity;
    let wind = response.data.wind.speed;
    let condition = response.data.condition.description;
    let icon = response.data.condition.icon_url;
    let date = new Date(response.data.time * 1000);

    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = city;

    let tempElement = document.querySelector(".current-temperature-value");
    tempElement.innerHTML = temperature;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${wind}km/h`;

    let conditionElement = document.querySelector("#condition");
    conditionElement.innerHTML = condition;

    let iconElement = document.querySelector(".current-temperature-icon");
    iconElement.innerHTML = `<img src=${icon} />`;

    let timeElement = document.querySelector("#current-date");
    timeElement.innerHTML = formatDate(date);

    getForecast(response.data.city);
}

//Form
function search(event) {
    event.preventDefault();

    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;

    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function displayForecast(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml =
                forecastHtml +
                `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
                    day.temperature.minimum
                )}º</div>
        </div>
      </div>
    `;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

getForecast("Paris");
