import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutocompletePlacesService {
  constructor() {}
  getPlaces() {
    return ['place 1', 'place 2'];
  }
}
