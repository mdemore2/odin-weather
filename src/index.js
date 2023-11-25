import "./style.css";

//console.log("webpack");
createPage();

function createPage() {
  var body = document.querySelector("body");
  var div = document.createElement("div");
  div.classList.add("container");
  var cityInput = document.createElement("input");
  cityInput.type = "text";
  var cityLabel = document.createElement("label");
  cityLabel.textContent = "City:\t";
  var submitBtn = document.createElement("button");
  submitBtn.textContent = "Tell me the weather!";
  submitBtn.addEventListener("click", getWeather);

  cityLabel.appendChild(cityInput);
  div.appendChild(cityLabel);
  div.appendChild(submitBtn);
  body.appendChild(div);

  var weatherDiv = document.createElement("div");
  body.appendChild(weatherDiv);
}

function getWeather(e) {}
