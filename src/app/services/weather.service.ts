import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityData } from '../models/cityData';
import { WeatherData } from '../models/weather.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  cities: CityData[] = this.sharedService.getCitiesFromLocalStorage();

  cityAdded = new Subject<CityData[]>();
  weatherDataChanged = new Subject<WeatherData>();
  weatherData?: WeatherData;


  getWeatherData(cityName: string): Observable<WeatherData> {

    return this.http.get<WeatherData>(environment.weatherApiBaseUrl, {
      params: new HttpParams()
        .set('q', cityName)
        .set('units', 'metric')
        .set('cnt', 40)
        .set('appid', environment.appid)
    })
  }
  getWeatherDataByLatLong(lat: number, lon: number): Observable<WeatherData> {

    console.log("lat lon callled")
    return this.http.get<WeatherData>(environment.weatherApiBaseUrl, {
      params: new HttpParams()
        .set('lat', lat)
        .set('lon', lon)
        .set('units', 'metric')
        .set('cnt', 40)
        .set('appid', environment.appid)
    });
  }

  setWeatherData(weatherData: WeatherData) {
    this.weatherData = weatherData;
    this.weatherDataChanged.next(this.weatherData);
  }
  getDataFromService() {
    return this.weatherData;
  }
  addCityWithData(cityData: CityData) {


    //this.cities = this.sharedService.getCitiesFromLocalStorage();
    const totalCities = this.cities.length;
    const city = this.cities.find(city => city.cityName === cityData.cityName);
    if ((totalCities > 7) && !city) {
      this.deleteCityById(0);
    }
    if (!city) {
      this.cities = [...this.cities, cityData];

      console.log('cities--', this.cities);
      this.sharedService.setCitiesToLocalStorage(this.cities);
      this.cityAdded.next(this.cities);
    }
  }
  deleteCityById(index: number) {

    this.sharedService.deleteCityByCityIdFromLocalStorage(index);
    this.cities?.splice(index, 1);
    console.log("After Deletion ", this.cities);
    this.cityAdded.next(this.cities);

  }
  deleteAllCities() {

    this.sharedService.removeCitiesFromLocalStorage();
    this.cities = [];
    this.cityAdded.next(this.cities);

  }
  getCities() {

    return this.cities;

  }

  getCurrentLatLong(): Promise<any> {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({
          lng: resp.coords.longitude,
          lat: resp.coords.latitude
        })
      });
    })
  }

  getCurrentLocation(): Promise<string> {
    var cityName = '';
    this.getCurrentLatLong().then(
      resp => {
        console.log(resp, "New function", resp.lng);
        console.log("", resp.lat);
        this.getWeatherDataByLatLong(resp.lat, resp.lng).subscribe(
          {
            next: (response) => {
              console.log(response.city.name);
              this.weatherData = response;

            }
          }
        );
      }
    );
    return new Promise(
      (resolve,reject)=>{
        
      }
    )


  }

  ngOnInit() {

  }
}
