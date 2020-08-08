import { CountriesList } from './../models/countries.model';
import { FormControl } from '@angular/forms';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Poi } from '../models/poi.model';
import { CategoryType } from '../models/categoryType.model';
import { MapsAPILoader } from '@agm/core';
// import {} from 'googlemaps';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  private poi = new Poi();
  private category = new CategoryType();
  private countries = new CountriesList();

  mapComponent = 'mappppp';
  lat: number;
  lng: number;
  selectedCategoryType: string;
  selectedCountry: string;

  categoryTypes: string[] = ['establishment', 'geocode'];
  countryList: object[] = this.countries.getCountries();
  // typeCollection: string[] = null;

  //Local Variable defined
  formattedaddress: string;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  options = {
    types: [this.category.getSelectedCategoryType()],
    // location: '33.8670522,151.1957362',
    // radius: '500',
    componentRestrictions: {
      // country: ['AU'],
    },
  };

  public test(tes) {
    const result = document.getElementsByClassName('pac-item');
    console.log('testinggggg', tes);
    console.log('result', result);
  }

  public handleSelectCategory(value: any) {
    console.log('selecting');
    this.category.setSelectedCategoryType(value);
    // this.selectedCategoryType = this.category.getSelectedCategoryType();
    this.ngOnInit();
  }

  public handleSelectCountry(value: any) {
    this.countries.setSelectedCategoryType(value);
    this.ngOnInit();
  }

  public handleAddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address;
    this.poi.setLat(address.geometry.location.lat());
    this.poi.setLng(address.geometry.location.lng());
    this.lat = this.poi.getLat();
    this.lng = this.poi.getLng();
  }

  ngOnInit(): void {
    // window.navigator.geolocation.getCurrentPosition((pos) => {
    //   this.poi.setLat(pos.coords.latitude);
    //   this.poi.setLng(pos.coords.longitude);
    // });
    console.log('this.countries.getCountries()', this.countries.countries);
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: [this.category.getSelectedCategoryType()],
          componentRestrictions: {
            country: [this.countries.getSelectedCountry()],
          },
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const latlng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          this.poi.setLat(latlng.lat);
          this.poi.setLng(latlng.lng);
          this.lat = this.poi.getLat();
          this.lng = this.poi.getLng();

          this.searchControl.reset();
        });
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const latlng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          this.poi.setLat(latlng.lat);
          this.poi.setLng(latlng.lng);
          this.lat = this.poi.getLat();
          this.lng = this.poi.getLng();

          this.searchControl.reset();
        });
      });
    });
  }

  private getCurrentLoc() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.poi.setLat(pos.coords.latitude);
        this.poi.setLng(pos.coords.longitude);
      });
    }
  }
}
