export class DisplayWeatherData  {

    cityName: string;
    temp: number;
    weather: string;
    wind: string;
    pressure: number;



    constructor(cityName: string, temp: number, weather: string, wind: string, pressure: number) {

        this.cityName = cityName;
        this.temp = temp;
        this.weather = weather;
        this.wind = wind;
        this.pressure = pressure;

    }

    getDisplayWeatherData():Object {
        return {
            cityName: this.cityName,
            temp: this.temp,
            weather: this.weather,
            wind: this.wind,
            pressure: this.pressure
        }
    }


}