let list = [];

function getURL(value) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=93f26e3c57081a6210de53b8dcfdfea4`;
  return url;
}
function findCity(value) {
  let url = `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=93f26e3c57081a6210de53b8dcfdfea4`;
  return url;
}
//
// let request = new XMLHttpRequest();
// request.open("GET", getURL("Hyderabad"), true);
// request.onload = function () {
//   if (request.status >= 200 && request.status <= 400) {
//     let data = JSON.parse(request.responseText);
//     console.log(data);
//
//     document.getElementById("temp").innerHTML = data.main.temp;
//   } else {
//     console.log("error");
//   }
// };
// request.send();
function fetchWeather(value) {
  fetch(getURL(value))
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      document.getElementById("root").innerHTML = Math.round(
        response.main.temp - 273
      );
    });
}

function fetchCityWeather(value) {
  fetch(findCity(value))
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // document.getElementById("root").innerHTML = Math.round(
      // 	response.main.temp - 273
      // );
      populateTableContent(response, value);
    });
}

function getC(value) {
  return `${Math.round(value - 273.15, 2)}<sup>o</sup>C`;
}

function getTemp(value){
	return `${Math.round(value - 273.15, 2)}`;
	
}

function populateTableContent(data, cityName) {
  let ul = document.querySelector("ul");
  if (data.list.length === 0) {
    ul.innerHTML = `
		<div>Oops, looks like "${cityName}" is not a city</div>
		`;
  }
  ul.innerHTML = '';
  list = data.list;
  data.list.forEach((item) => {
    ul.innerHTML += `
		<li class="list-group-item d-flex justify-content-between align-items-center" onclick="generateCard(${
      item.id
    })">
            ${item.name}, ${item.sys.country}
            <span >${getC(item.main.temp)}</span>
        </li>
		`;
  });
  generateCard(list[0].id);
}

function generateCard(id) {
  const item = list.find((item) => item.id === id);
  const div = document.querySelector("#side-card");
  div.innerHTML = `
		<div class="card weather-card">
          <div class="card-body pb-3">
            <h4 class="card-title font-weight-bold">${item.name}, ${item.sys.country}</h4>
            <p class="card-text">${(new Date()).toDateString()} , ${item.weather[0].main}</p>
            <div class="d-flex justify-content-between temperature">
              <p class="display-1">${getTemp(item.main.temp)}
              <span class="degree">&#8451;</span>
              </p>
              <div class="max-min">${getC(item.main.temp_min)}/${getC(item.main.temp_max)}</div>
            </div>
            <div class="d-flex justify-content-between mb-4">
              <p>
                <i class="fas fa-tint fa-lg text-info pr-2"></i>${item.main.humidity}% Humidity
              </p>
              <p>
                <i class="fas fa-leaf fa-lg grey-text pr-2"></i>${item.wind.speed} km/h Winds
              </p>
            </div>
          </div>
        </div>
	`;
}
