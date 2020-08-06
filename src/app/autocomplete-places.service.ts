import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AutocompletePlacesService {
  constructor(private lat: number = 51.678418, private lng: number = 7.809007) {
  }
  getPlaces() {
    return ['place 1', 'place 2'];
  }
  // getting latitude
  getLat() {

    return this.lat
  }
  
  // setting latitude
  setLat(latitude) {
    console.log('setting lat')
    this.lat = latitude
  }
  
  // getting longitude
  getLng() {

    return this.lng
  }
  
  // setting longitude
  setLng(longitude) {
    this.lng = longitude
  }


}


