let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Frida",
  "Saturday",
];
let currentDay = days[now.getDay()];

let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let timeChange = document.querySelector("#time");
timeChange.innerHTML = `${currentDay} ${currentHour} : ${currentMinute}`;

function convertToFah(event) {
  event.preventDefault();
  let cityTemp = document.querySelector("#city-temp");
  let cityFah = Math.round((cityTemp.innerHTML * 9) / 5 + 32);
  cityTemp.innerHTML = `${cityFah}`;
}

let tempFahrenheit = document.querySelector("#link-2");
tempFahrenheit.addEventListener("click", convertToFah);

function convertToCelcius(event) {
  event.preventDefault();
  let cityTemp = document.querySelector("#city-temp");
  cityTemp.innerHTML = `19`;
}

let tempCelcius = document.querySelector("#link-1");
tempCelcius.addEventListener("click", convertToCelcius);

//show default city weather consitions

function search(city) {
  let units = "metric";
  let apiKey = "4091b06da263484df848822445999498";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherForCityValue);
}
//show temperature for a searchCityValue//
function showWeatherForCityValue(response) {
  console.log(response.data);
  let currentCity = document.querySelector("#city-temp");
  let currentTemp = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${currentTemp}`;

  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${humid}%`;

  let speed = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind ${speed}m/s`;

  let desc = response.data.weather[0].description;
  let WeatherDesc = document.querySelector("#description");
  WeatherDesc.innerHTML = `${desc}`;

  let name = response.data.name;
  let cityDisplayName = document.querySelector("#name");
  cityDisplayName.innerHTML = `${name}`;
}

function handleForm(event) {
  event.preventDefault();

  let city = document.querySelector("#text-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleForm);

//show temperature for current button//
function showTempForCurrentLocation(response) {
  console.log(response);
  let currentLocationTenperature = Math.floor(response.data.main.temp);
  let currentLocationDisplayTemp = document.querySelector("#city-temp");
  currentLocationDisplayTemp.innerHTML = `${currentLocationTenperature}`;

  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${humid}%`;

  let speed = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind ${speed}m/s`;

  let desc = response.data.weather[0].description;
  let WeatherDesc = document.querySelector("#description");
  WeatherDesc.innerHTML = `${desc}`;

  let name = response.data.name;
  let cityDisplayName = document.querySelector("#name");
  cityDisplayName.innerHTML = `${name}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "4091b06da263484df848822445999498";
  let units = "metric";
  let currentApiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let currentLocationApiUrl = `${currentApiEndPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(currentLocationApiUrl).then(showTempForCurrentLocation);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", showCurrent);

search("New York");
