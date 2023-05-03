import { TestBed } from '@angular/core/testing';

import { FlightDataResolver } from './flight-data.resolver';

describe('FlightDataResolver', () => {
  let resolver: FlightDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FlightDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
