import { Injectable } from '@angular/core';
import { IAirport } from 'src/app/shared/models/interfaces/airport-interface';
import { RequestBuilderService } from 'src/app/shared/services/request-builder/request-builder.service';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { BASE_URL, URL_ALL_AIRPORTS, URL_SEARCH } from 'src/app/shared/models/constants/api-urls';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  airportsListDeparture$$ = new BehaviorSubject<IAirport[]>([]);

  airportsListDestination$$ = new BehaviorSubject<IAirport[]>([]);

  searchItemDeparture$$ = new BehaviorSubject<string>('');

  searchItemDestination$$ = new BehaviorSubject<string>('');

  constructor(private requestBuilderService: RequestBuilderService) {}

  getAirportsFromServer(): Observable<IAirport[]> {
    return this.requestBuilderService.get<IAirport[]>(`${BASE_URL}${URL_ALL_AIRPORTS}`);
  }

  getAirportsListDeparture() {
    this.getAirportsFromServer().subscribe({
        next: (data) => {
          this.airportsListDeparture$$.next(data);
        },
        error: (err) => of(err.status),
      });
  }

  getAirportsListDestination() {
    this.getAirportsFromServer().subscribe({
        next: (data) => {
          this.airportsListDestination$$.next(data);
        },
        error: (err) => of(err.status),
      });
  }

  getSearchAirport(query: string): Observable<IAirport[]> {
    return this.requestBuilderService
      .get<IAirport[]>(`${BASE_URL}${URL_SEARCH}${query}`)
      .pipe(catchError((err) => of(err.status)));
  }
}
