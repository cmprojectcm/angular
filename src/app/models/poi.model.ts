export class Poi {
  private lat: number;
  private lng: number;

  constructor() {}

  //  autocomplete = new google.maps.places.Autocomplete()

  // getters
  getLat() {
    return this.lat;
  }

  getLng() {
      return this.lng;
  }

  // setters
  setLat(latitude) {
    this.lat = latitude;
  }
  setLng(longitude) {
    this.lng = longitude;
  }
}
