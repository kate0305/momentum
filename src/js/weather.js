const weatherIcon = document.querySelector('.weather__icon');
const temperature = document.querySelector('.weather__description_temperature');
const weatherDescription = document.querySelector('.weather-description_condition');
const city = document.querySelector('.weather__city');
const wind = document.querySelector('.weather__wind');
const humidity = document.querySelector('.weather__humidity');
const error = document.querySelector('.weather__error');

city.value = 'Minsk';

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=618bc2889223705578b94295de4d265a&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    error.textContent = '';
    weatherIcon.className = 'weather__icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  } catch {
    error.textContent = 'Invalid city!';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
}

const setCity = () => {
  localStorage.setItem('city', city.value);
}

const getCity = () => {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather();
  }
}

const enterCity = (e) => {
  if (e.code === 'Enter') {
    city.blur();
  }
}

city.addEventListener('change', getWeather);
city.addEventListener('keypress', enterCity);
window.addEventListener('beforeunload', setCity);
window.addEventListener('load', getCity);

export default getWeather;
