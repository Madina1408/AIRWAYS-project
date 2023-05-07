import { Injectable } from '@angular/core';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { RequestBuilderService } from 'src/app/shared/services/request-builder.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  airportsList$$ = new BehaviorSubject<ISelectAirport[]>([]);

  searchItem$$ = new BehaviorSubject<string>('');

  constructor(private requestBuilderService: RequestBuilderService) {}

  getAirportsFromServer(): Observable<ISelectAirport[]> {
    return this.requestBuilderService.get<ISelectAirport[]>('https://api.air-ways.online/search/airport');
  }

  getAirportsList() {
    this.getAirportsFromServer().subscribe({
        next: (data) => {
          this.airportsList$$.next(data);
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
  }
}
