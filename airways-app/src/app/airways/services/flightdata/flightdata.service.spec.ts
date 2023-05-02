import { TestBed } from '@angular/core/testing';

import { FlightdataService } from './flightdata.service';

describe('FlightdataService', () => {
  let service: FlightdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
