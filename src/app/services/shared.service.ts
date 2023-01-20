import { Injectable } from '@angular/core';
import { CityData } from '../models/cityData';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  cities?:CityData[];

  setCitiesToLocalStorage(cities: CityData[]) {
    localStorage.setItem('cities', JSON.stringify(cities));
  }
  getCitiesFromLocalStorage() {
      return JSON.parse(localStorage.getItem('cities') ||'[]')
  }
  deleteCityByCityIdFromLocalStorage(index: number){

    this.cities= JSON.parse(localStorage.getItem('cities') ||'[]')

    this.cities?.splice(index,1);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }
  removeCitiesFromLocalStorage(){
    localStorage.removeItem('cities');
  }
}
