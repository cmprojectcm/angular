import { Injectable,ViewChild } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AutocompletePlacesService {
  private lat: number;
  private lng: number;
  
  constructor() {
  }

//  autocomplete = new google.maps.places.Autocomplete()

  categoryType() {
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


