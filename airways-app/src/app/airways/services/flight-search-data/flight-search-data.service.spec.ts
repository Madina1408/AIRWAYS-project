import { TestBed } from '@angular/core/testing';

import { FlightSearchDataService } from './flight-search-data.service';

describe('FlightSearchDataService', () => {
  let service: FlightSearchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightSearchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
