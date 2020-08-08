import { TestBed } from '@angular/core/testing';

import { GoogleMapsPlacesApiService } from './google-maps-places-api.service';

describe('GoogleMapsPlacesApiService', () => {
  let service: GoogleMapsPlacesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapsPlacesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
