import { TestBed } from '@angular/core/testing';

import { AutocompletePlacesService } from './autocomplete-places.service';

describe('AutocompletePlacesService', () => {
  let service: AutocompletePlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompletePlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
