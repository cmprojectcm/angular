import { Component, OnInit,ViewChild } from '@angular/core';
import { AutocompletePlacesService } from '../autocomplete-places.service'
import {MultiSelectModule} from 'primeng/multiselect';
@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})

export class MapComponent implements OnInit {
  mapComponent = 'mappppp';
  lat: number;
  lng: number;
  service = new AutocompletePlacesService();
  // getLat: () => {};
  // getLng: () => {};

  //Local Variable defined 
  formattedaddress: string;

  constructor() {
    this.lat = this.service.getLat();
    this.lng = this.service.getLng();

    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.lat = pos.coords.latitude
      this.lng = pos.coords.longitude
    })
    console.log('getttting', this.service.getLat())
  }
  

  
  public handleAddressChange(address: any) { 
  //setting address from API to local variable 
    console.log('address', address)
    this.formattedaddress = address.formatted_address 
    this.service.setLat(address.geometry.location.lat())
    this.service.setLng(address.geometry.location.lng())
    this.lat = this.service.getLat();
    this.lng = this.service.getLng();
} 

  ngOnInit(): void {}
}
