import { Injectable } from '@angular/core';
import airports from '../../data/constants/airports';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { RequestBuilderService } from 'src/app/shared/services/request-builder.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  airportItems: ISelectAirport[] = airports;

  constructor(private requestBuilderService: RequestBuilderService) {}

  getAirports(): Observable<ISelectAirport[]> {
    return this.requestBuilderService.get<ISelectAirport[]>('https://api.air-ways.online/search/airport');
  }

}
