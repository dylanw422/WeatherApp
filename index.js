let temp = document.querySelector('#currenttemp')
let search = document.querySelector('input')
let cityIdentifier = document.querySelector('#cityplace')
let feels = document.querySelector('#feels')
let wind = document.querySelector('#wind')
let humidity = document.querySelector('#humidity')
let dayOne = document.querySelector('#dayOne')
let dayTwo = document.querySelector('#dayTwo')
let dayThree = document.querySelector('#dayThree')
let dayFour = document.querySelector('#dayFour')
let dayFive = document.querySelector('#dayFive')
let city;

async function getWeather() {    
    let lat;
    let lon;
    const geoResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7cca887bcacb1085e8fd6421b8128128&units=imperial`)
    const geoData = await geoResponse.json()
    console.log(geoData)
    lat = geoData.coord.lat
    lon = geoData.coord.lon
    const locResponse = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=7cca887bcacb1085e8fd6421b8128128`)
    const locData = await locResponse.json()
    console.log(locData)
    temp.textContent = geoData.main.temp.toString().slice(0,2) + '°F'
    temp.style.animation = 'fade 2s'
    cityIdentifier.textContent = geoData.name + ', ' + locData[0].state
    cityIdentifier.style.animation = 'fade 2s'
    feels.textContent = 'Feels Like: ' + geoData.main.feels_like.toString().slice(0,2) + '°F'
    feels.style.animation = 'fade 2s'
    wind.textContent = 'Wind: ' + geoData.wind.speed.toString().slice(0,2) + ' MPH'
    wind.style.animation = 'fade 2s'
    humidity.textContent = 'Humidity: ' + geoData.main.humidity + '%'
    humidity.style.animation = 'fade 2s'

    const forecastResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7cca887bcacb1085e8fd6421b8128128&units=imperial`)
    const forecastData = await forecastResponse.json()
    console.log(forecastData)
    dayOne.textContent = (forecastData.list[5].main.temp.toString().slice(0,2) + "°F " + forecastData.list[5].weather[0].main)
    dayTwo.textContent = (forecastData.list[13].main.temp.toString().slice(0,2) + "°F " + forecastData.list[13].weather[0].main)
    dayThree.textContent = (forecastData.list[21].main.temp.toString().slice(0,2) + "°F " + forecastData.list[21].weather[0].main)
    dayFour.textContent = (forecastData.list[29].main.temp.toString().slice(0,2) + "°F " + forecastData.list[29].weather[0].main)
    dayFive.textContent = (forecastData.list[37].main.temp.toString().slice(0,2) + "°F " + forecastData.list[37].weather[0].main)
}

search.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        city = search.value
        getWeather()
        temp.style.animation = ''
        cityIdentifier.style.animation = ''
        feels.style.animation = ''
        wind.style.animation = ''
        humidity.style.animation = ''
    }
})