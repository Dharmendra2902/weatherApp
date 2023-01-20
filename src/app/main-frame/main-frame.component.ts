import { Component, OnInit } from '@angular/core';
import { CityData } from '../models/cityData';
import { WeatherData } from '../models/weather.model';
import { WeatherService } from '../services/weather.service';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.css']
})

export class MainFrameComponent implements OnInit {


  faRefresh = faRefresh;
  cities: CityData[] = [];
  weatherData?: WeatherData;
  cityName: string = '';
  errorMessage = '';
  spinClass = 'fas';

  hotDay?: boolean;

  constructor(private weatherService: WeatherService,
  ) { }
  async ngOnInit(){

    this.cities = this.weatherService.getCities();
    let city = this.cities.pop();
    
    this.weatherService.getCurrentLocation().then(
      response=>{
        console.log("resp",response)
      }
    )
    
    this.cityName = city?.cityName ? city.cityName : await this.weatherService.getCurrentLocation();
    this.weatherService.getWeatherData(this.cityName)
      .subscribe({
        next: (response) => {
          this.weatherService.setWeatherData(response);
          this.weatherData = response;
          console.log(this.weatherData)
          this.hotDay = this.weatherData.list[0].main.temp > 30;
          this.weatherService.weatherDataChanged.subscribe(
            (weatherData: WeatherData) => {
              this.weatherData = weatherData;
              this.hotDay = weatherData.list[0].main.temp > 30
            }
          )
          this.weatherService.cityAdded.subscribe(
            (cities: CityData[]) => {
              this.cities = cities;
            }
          )
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      });
  }
  onRefreshData() {
    this.spinClass = "fas fa-spin";
    this.weatherService
      .getWeatherData(this.weatherData?.city.name ? this.weatherData?.city.name : 'Indore').subscribe(
        {
          next: (response) => {
            this.weatherData = response;
            this.spinClass = 'fas';
          }
        }
      );
  }
}
