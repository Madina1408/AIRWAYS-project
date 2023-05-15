import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPassenger } from 'src/app/shared/models/interfaces/passengers-interface';
import passengersList from '../../../shared/models/constants/passengers';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchDataService {
  passengers: IPassenger[] = passengersList;

  selectedFlightType$$ = new BehaviorSubject<string>('round-trip');
  selectedValueDeparture$$ = new BehaviorSubject<string>('');
  selectedValueDestination$$ = new BehaviorSubject<string>('');
  selectedValueDateFrom$$ = new BehaviorSubject<Date | null>(null);
  selectedValueDateReturn$$ = new BehaviorSubject<Date | null>(null);
  selectedValuePassengers$$ = new BehaviorSubject<string>('');

  setSelectedFlightType(value: string) {
    this.selectedFlightType$$.next(value);
  }

  setSelectedValueDeparture(value: string) {
    this.selectedValueDeparture$$.next(value);
  }

  setSelectedValueDestination(value: string) {
    this.selectedValueDestination$$.next(value);
  }

  setSelectedValueDateFrom(value: Date | null) {
    this.selectedValueDateFrom$$.next(value);
  }

  setSelectedValueDateReturn(value: Date | null) {
    this.selectedValueDateReturn$$.next(value);
  }

  setSelectedValuePassengers(value: string) {
    this.selectedValuePassengers$$.next(value);
  }
}

