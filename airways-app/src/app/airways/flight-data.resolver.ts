import { Injectable } from '@angular/core';
import { IGotFlightDataList } from '../../app/shared/models/interfaces/flight-data';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { FlightdataService } from './services/flightdata/flightdata.service';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightDataResolver implements Resolve<IGotFlightDataList> {
  constructor(private flightData: FlightdataService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IGotFlightDataList> {
    return this.flightData.onclick().
    pipe(
      // delay(2000),
      catchError(() => {
        this.router.navigate(['']);
        return EMPTY;
      })
    );
  }
}
