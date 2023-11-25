import "./style.css";

//console.log("webpack");
createPage();

function createPage() {
  var body = document.querySelector("body");
  var div = document.createElement("div");
  div.classList.add("container");
  var cityInput = document.createElement("input");
  cityInput.type = "text";
  cityInput.id = "city";
  cityInput.minLength = 2;
  var cityLabel = document.createElement("label");
  cityLabel.textContent = "City:\t";
  var submitBtn = document.createElement("button");
  submitBtn.textContent = "Tell me the weather!";
  submitBtn.addEventListener("click", tellMeTheWeather);

  cityLabel.appendChild(cityInput);
  div.appendChild(cityLabel);
  div.appendChild(submitBtn);
  body.appendChild(div);

  var weatherDiv = document.createElement("div");
  weatherDiv.classList.add("weather");
  weatherDiv.id = "weather";
  body.appendChild(weatherDiv);

  var loaderDiv = document.createElement("div");
  loaderDiv.innerHTML = `<div></div><div></div><div></div><div></div>`;
  loaderDiv.className = "lds-ellipsis";
  loaderDiv.style.visibility = "hidden";
  body.appendChild(loaderDiv);
}

async function tellMeTheWeather(e) {
  clearWeather();
  showLoader();
  var city = document.getElementById("city").value;
  var weather = await getWeather(city);
  hideLoader();
  displayWeather(weather);
}

function clearWeather() {
  var weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = ``;
}

async function getWeather(city) {
  const coords = await getCoords(city);
  const lat = coords[0];
  const lon = coords[1];
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m`
  );
  const responseObj = await response.json();
  console.log(responseObj);
  return responseObj;
}

async function getCoords(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
  );
  const responseObj = await response.json();
  const results = responseObj.results;
  console.log(results);
  const lat = results[0].latitude;
  const lon = results[0].longitude;
  console.log(lat);
  console.log(lon);
  var coords = [lat, lon];
  return coords;
}

function displayWeather(forecast) {
  var weatherDiv = document.getElementById("weather");
  var current = document.createElement("ul");
  const units = forecast.current_units;
  for (const [key, value] of Object.entries(forecast.current)) {
    console.log(`${key}: ${value} ${units[key]}`);
    var li = document.createElement("li");
    li.textContent = `${key}: ${value} ${units[key]}`;
    current.appendChild(li);
  }
  weatherDiv.appendChild(current);
}

function showLoader() {
  var loader = document.querySelector(".lds-ellipsis");
  loader.style.visibility = "visible";
}

function hideLoader() {
  var loader = document.querySelector(".lds-ellipsis");
  loader.style.visibility = "hidden";
}

/**
 * Delay for a number of milliseconds
 */
function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}
