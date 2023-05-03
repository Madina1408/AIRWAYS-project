import { Injectable } from '@angular/core';
import airports from '../data/constants/airports';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  airportItems: ISelectAirport[] = airports;

}
