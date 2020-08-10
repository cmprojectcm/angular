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

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponent implements OnInit {

  // gets the search box on dom
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  // private variables

  // instances
  private poi = new Poi();
  private category = new CategoryType();
  private countries = new CountriesList();

  private MARKER_PATH:string =
    'https://developers.google.com/maps/documentation/javascript/images/marker_green';

  // public variables
  lat: number;
  lng: number;
  selectedCategoryType: string;
  selectedCountry: string;
  markers = [];
  photos = [];
  radiusValues = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000];
  selectedRadiusValue: number;

  categoryTypes: object[] = this.category.getCategoryTypes();
  countryList: object[] = this.countries.getCountries();


  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}


  //handling category input change
  public handleSelectCategory(value: string) {
    this.category.setSelectedCategoryType(value);
    this.ngOnInit();
  }

  //handling country input change
  public handleSelectCountry(value: string) {
    this.countries.setSelectedCategoryType(value);
    this.ngOnInit();
  }

  //handling radius input change
  public handleSelectRadius(radius) {
    this.selectedRadiusValue = radius;
    this.ngOnInit();
  }

  mapReady(value) {
    // console.log('value:', value)
  }

  resultHover(event, marker) {

    this.poi.setLat(marker.geometry.location.lat());
    this.poi.setLng(marker.geometry.location.lng());
    this.poi.getLat()
    this.poi.getLng()
    this.ngOnInit()
  }

  //handling search input disable
  public handleSearchInputDisable() {
    let isDisabled: boolean;
    if (this.selectedRadiusValue === undefined
      || this.selectedCategoryType === undefined
      || this.selectedCountry === undefined) {
      isDisabled = true
    }
    return isDisabled;
  }

  // component initialization
  ngOnInit(): void {

    this.getCurrentLoc();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        //specify the search input element
        this.searchElementRef.nativeElement,
        //parsing info used for the prediction returned from autocomplete places
        {
          componentRestrictions: {
            country: [this.countries.getSelectedCountry()],
          },
        }
      );

      //after user selects a location from the searchbox google places autocomplete
      autocomplete.addListener('place_changed',() => {
        this.ngZone.run(() => {

          //get the selected place
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //getting the places service in order to be able to uses its features
          const places = new google.maps.places.PlacesService(
            document.createElement('div')
          );

          //return if there is no location returned
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const latlng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          //setting lat and lng
          this.poi.setLat(latlng.lat);
          this.poi.setLng(latlng.lng);

          //getting lat and lng
          this.lat = this.poi.getLat();
          this.lng = this.poi.getLng();

          //searching for any item based on category type and radius given by user
          places.nearbySearch(
            //passing arguments in order to get results based on them
            {
              location: { lat: this.poi.getLat(), lng: this.poi.getLng() },
              radius: this.selectedRadiusValue,
              types: [this.category.getSelectedCategoryType()],
            },
            //callback function to manipulate the response results from google palces api
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {

                // Create a marker for each category type found, and
                // assign a letter of the alphabetic to each marker icon.
                for (let i = 0; i < results.length; i++) {
                  let markerLetter = String.fromCharCode(
                    'A'.charCodeAt(0) + (i % 26)
                  );
                  let markerIcon = this.MARKER_PATH + markerLetter + '.png';
                  // Use marker animation to drop the icons incrementally on the map.
                  this.markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon,
                  });

                  // If the user clicks a hotel marker, show the details of that hotel
                  // in an info window.
                  this.markers[i].placeResult = results[i];
                  this.photos = results[i].photos;
                }
              }
            }
          );
        });
      });
    });
  }

  //gets the location of the device
  private getCurrentLoc() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.poi.setLat(pos.coords.latitude);
        this.poi.setLng(pos.coords.longitude);
      });
    }
  }
}
