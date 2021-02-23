import { WeatherProvider } from "./Providers/WeatherProvider.js"
import { SearchCity } from "./Components/SearchCity.js"
import { WeatherTable } from "./Components/WeatherTable.js"

const loadWeather = async () => {
  const weatherProvider = new WeatherProvider();
  const weatherTable = new WeatherTable();
  const container2 = document.querySelector(".container2");
  container2.appendChild(weatherTable.table);

  const searchContainer = document.querySelector('#searchbar');
  const searchInput = new SearchCity();
  await searchInput.init(async (cityData) => {
    const { lat, lon } = cityData.coord;
    const data = await weatherProvider.getWeather(lat, lon);
    
    processData(data, weatherTable); 
  });
  searchContainer.appendChild(searchInput.container);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      const data = await weatherProvider.getWeather(lat, lon);

      processData(data, weatherTable); 
    });
  }  
};

const processData = (data, weatherTable) => {
  const location = document.querySelector("#loc");
  const timeNow = document.querySelector(".nowTime");
  const temperature = document.querySelector(".celsia");
  
  const place = data.city.name; // LOKALITA
  const { temp } = data.list[0].main;

  const now = new Date();

  location.textContent = place;
  timeNow.textContent = now.toLocaleTimeString();

  temperature.textContent = `${Math.round(temp)}°C`;

  const lastDate = new Date(now);
  lastDate.setDate(now.getDate() + 5);

  const filteredData = data.list.filter(r => {
    const date = new Date(r.dt_txt);
    return date.getHours() == 12 && date > now && date < lastDate
  });
  weatherTable.fillWithData(filteredData);
}

(() => {
  window.addEventListener("load", loadWeather());
})();
