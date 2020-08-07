import { Component, OnInit,ViewChild } from '@angular/core';
import { AutocompletePlacesService } from '../autocomplete-places.service'
import {MultiSelectModule} from 'primeng/multiselect';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
// import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})

export class MapComponent implements OnInit {
  mapComponent = 'mappppp';
  lat: number;
  lng: number;
  locInput: any;
  typeSelector: any;
  map: any
  autocomplete:any
  private service = new AutocompletePlacesService();
  

  //Local Variable defined 
  formattedaddress: string;

  constructor() {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.service.setLat(pos.coords.latitude)
      this.service.setLng(pos.coords.longitude)
    })
  }

  options = {
    types:['establishment'],
    componentRestrictions: {
      country:['AU'],
      // types:['food']
    }
  }

 onKey() {
   console.log('locInput', this.locInput)
   this.autocomplete = new google.maps.places.Autocomplete(this.locInput);
   console.log('autocomplete', this.autocomplete)
  // return this.locInput;
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

  ngOnInit(): void {

  }
}
