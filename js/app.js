'use strict';

const api = {
  key: '5865051c53378834035fe4962e6e7a6b',
  baseurl: 'https://api.openweathermap.org/data/2.5/',
};

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keyup' , setQuery);

function setQuery(e){
  if(e.keyCode == 13){
    console.log(searchBox.value);
    getResult(searchBox.value);
  }
}

function getResult(query){
  fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult)
}

function displayResult(weather){
  console.log(weather);
  let coutry = document.querySelector('section .city');
  coutry.innerHTML = `${weather.name}, ${weather.sys.country}`;

  const now = new Date()
  let date = document.querySelector('.date');
  date.innerHTML = updateDate(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`;

  let weatherEI = document.querySelector('.weather');
  weatherEI.innerHTML = weather.weather[0].main;

  let hiLow = document.querySelector('.hi-low');
  hiLow.innerHTML = `${Math.round(weather.main.temp_min)} °C/ ${Math.round(weather.main.temp_max)}`;
}

function updateDate(s){
  let months =[ 
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June",
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"];

  let days = [
  'Mon', 
  'Tue', 
  'Wed', 
  'Thu', 
  'Fri', 
  'Sat', 
  'Sun'];

  let day = days[s.getDay()],
    date = s.getDate(),
    month = months[s.getMonth()],
    year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}