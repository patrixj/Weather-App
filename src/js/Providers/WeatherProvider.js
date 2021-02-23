export class WeatherProvider {
    constructor(){
        const apiKey = "2c700df3bf7faf64922d818c37e53355";
        this.apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=<latitude>&lon=<longitude>&appid=${apiKey}&units=metric`;
    }

    async getWeather(latitude, longitude){
        const url = this.apiUrl.replace("<latitude>", latitude).replace("<longitude>", longitude);
        const data = (await (await fetch(url)).json());
        return data;
    }
}