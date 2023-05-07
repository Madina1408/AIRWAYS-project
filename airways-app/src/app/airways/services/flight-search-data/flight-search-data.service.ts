import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISelectPassengers } from 'src/app/shared/models/interfaces/select-passangers-interface';
import passengersList from '../../data/constants/passengers';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchDataService {
  passengers: ISelectPassengers[] = passengersList;

  selectedFlightType$$ = new BehaviorSubject<string>('round-trip');
  selectedValueDeparture$$ = new BehaviorSubject<string>('');
  // currentDeparture = this.selectedValueDeparture$$.asObservable();
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

