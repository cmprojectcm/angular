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
import { AgmMap } from '@agm/core';
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

  @ViewChild('mapElement')
  public mapElementRef: any;

  private poi = new Poi();
  private category = new CategoryType();
  private countries = new CountriesList();

  lat: number;
  lng: number;
  selectedCategoryType: string;
  selectedCountry: string;
  markers = [];
  photos = [];
  MARKER_PATH =
    'https://developers.google.com/maps/documentation/javascript/images/marker_green';

  categoryTypes: object[] = this.category.getCategoryTypes();
  countryList: object[] = this.countries.getCountries();

  //Local letiable defined
  // formattedaddress: string;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  options = {
    types: [this.category.getSelectedCategoryType()],
    // location: '33.8670522,151.1957362',
    // radius: '500',
    componentRestrictions: {
      // country: ['AU'],
    },
  };

  public handleSelectCategory(value: string) {
    console.log('value', value)
    this.category.setSelectedCategoryType(value);
    // this.selectedCategoryType = this.category.getSelectedCategoryType();
    this.ngOnInit();
  }

  public handleSelectCountry(value: string) {
    console.log('value 2', value)
    this.countries.setSelectedCategoryType(value);
    this.ngOnInit();
  }

  public resultHover(value: any, name:any) {
    // console.log('value', value)
    // console.log('name', name)
    // google.maps.event.trigger(markers[i], 'click');
  }

  ngOnInit(): void {
    // this.searchControl = new FormControl();
    this.getCurrentLoc();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          // types: [this.category.getSelectedCategoryType()],
          componentRestrictions: {
            country: [this.countries.getSelectedCountry()],
          },
        }
      );

      autocomplete.addListener('place_changed',() => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          const places = new google.maps.places.PlacesService(
            document.createElement('div')
          );

          // console.log('places', places);

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

          // Search for hotels in the selected city, within the viewport of the map.
          // const search = () => {

          places.nearbySearch(
            {
              location: { lat: this.poi.getLat(), lng: this.poi.getLng() },
              radius: 10000,
              types: [this.category.getSelectedCategoryType()],
            },
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                // clearResults();
                // clearMarkers();

                // Create a marker for each hotel found, and
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
                  // console.log('results', results[i]);

                  // console.log('photos', this.photos);

                  // results[i].photos.map((photo) => photo.getUrl({ maxHeight: 200, maxWidth: 200 }) ) ;

                  console.log('markers', this.markers)

                  // google.maps.event.addListener(
                  //   this.markers[i],
                  //   'click',
                  //   showInfoWindow
                  // );

                  // setTimeout(dropMarker(i), i * 100);
                  // addResult(results[i], i);
                }
              }
            }
          );

          // };
          // this.searchControl.reset();

          // const dropMarker = (i) => {
          //   console.log('markers', this.markers);
          //   return () => {
          //     this.markers[i].setMap(this.mapElementRef._elem.nativeElement);
          //   };
          // };

          // const addResult = (result, i) => {
          //   console.log('result', result);
          //   console.log('i', i);
          //   // let results = document.getElementById('results');
          //   let markerLetter = String.fromCharCode(
          //     'A'.charCodeAt(0) + (i % 26)
          //   );
          //   let markerIcon = this.MARKER_PATH + markerLetter + '.png';

          //   let tr = document.createElement('tr');
          //   tr.style.backgroundColor = i % 2 === 0 ? '#F0F0F0' : '#FFFFFF';
          //   tr.onclick = () => {
          //     google.maps.event.trigger(this.markers[i], 'click');
          //   };

          //   let iconTd = document.createElement('td');
          //   let nameTd = document.createElement('td');
          //   let icon = document.createElement('img');
          //   icon.src = markerIcon;
          //   icon.setAttribute('class', 'placeIcon');
          //   icon.setAttribute('className', 'placeIcon');
          //   let name = document.createTextNode(result.name);
          //   iconTd.appendChild(icon);
          //   nameTd.appendChild(name);
          //   tr.appendChild(iconTd);
          //   tr.appendChild(nameTd);
          //   // results.appendChild(tr);
          // };
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
