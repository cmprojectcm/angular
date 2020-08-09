export class Poi {
  private lat: number;
  private lng: number;

  constructor() {}

  //  autocomplete = new google.maps.places.Autocomplete()

  // getting latitude
  getLat() {
    return this.lat;
  }

  // setting latitude
  setLat(latitude) {
    this.lat = latitude;
  }

  // getting longitude
  getLng() {
    return this.lng;
  }

  // setting longitude
  setLng(longitude) {
    this.lng = longitude;
  }
}
