import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model'
import { SharedService } from '../services/shared.service';
import { CityData } from '../models/cityData';
import { faDeleteLeft,faXmark,faRefresh,faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private weatherService: WeatherService,
    private sharedService: SharedService) { }

  errorMessage?: string;
  cities: CityData[] = this.sharedService.getCitiesFromLocalStorage();
  faDeleteLeft = faDeleteLeft;
  faPlus = faPlus;
  faRefresh = faRefresh;
  faCross = faXmark;
  clearButton = true;
  titleOnAdd = 'Enter city name';
  spinClass =false;

  weatherData?: WeatherData;

  onChangeHandler(searchQuery: any) {
    if(searchQuery!=='')
    {
      this.titleOnAdd='Add city';
    }
    
    this.errorMessage = '';
  }
  hotDay:boolean = false;
  
  inputHandler(searchQuery: string) {

    this.errorMessage = ''
    this.weatherService.getWeatherData(searchQuery)
      .subscribe({
        next: (response) => {
          this.weatherService.setWeatherData(response);
          this.weatherData = response;
         
          let cityData:CityData = {
            cityName : this.weatherData.city.name,
            temp :this.weatherData.list[0].main.temp,
            cityId :this.weatherData.city.id,
            weather :this.weatherData.list[0].weather[0].main,
            active:"fas"
          }
          this.weatherService.cityAdded.subscribe(
            (cities:CityData[]) => {
              this.cities = cities;
              if(this.cities?.length<1)
              {
                this.clearButton = false;
              }
              else{
                this.clearButton=true;
              }
            }
          );

          this.weatherService.addCityWithData(cityData);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      });
  }
  ngOnInit(): void {

    this.weatherService.cityAdded.subscribe(
      (cities:CityData[]) => {
        this.cities = cities;
        if(this.cities?.length<1)
        {
          this.clearButton = false;
        }
        else{
          this.clearButton=true;
        }
      }
    );
    if(!(this.cities?.length))
    {
      this.clearButton = false;
    }
   // console.log(moment(1652337000).format("DD MMM YYYY hh:mm a"));
  }

  onDeleteCity(index:number){
    this.weatherService.deleteCityById(index);
  }
  onCitySelect(cityName: string){
    this.inputHandler(cityName);

  }
  onDeleteAll(){
    this.weatherService.deleteAllCities();
  }
  onRefreshCity(city:CityData,i:number,e:Event){
  
    console.log();
      city.active="fas fa-spin"
    
    this.weatherService.getWeatherData(city.cityName).subscribe(
      {
        next: (response)=>{
          
          this.cities[i].temp = response.list[0].main.temp;
          this.cities[i].weather = response.list[0].weather[0].main;
          city.active = "fas";
  
        }
      }
    )

    
  }
  
 
  onRefreshing(e:any){
    console.log(e.className)

  }
  removeError(){
    this.errorMessage='';
  }
}
