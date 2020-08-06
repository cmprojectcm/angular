import { Component, OnInit } from '@angular/core';
import { AutocompletePlacesService } from '../autocomplete-places.service';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponent implements OnInit {
  mapComponent = 'mappppp';
  places
  constructor(service: AutocompletePlacesService) {
    // service.
    this.places = service.getPlaces()
  }

  ngOnInit(): void {}
}
