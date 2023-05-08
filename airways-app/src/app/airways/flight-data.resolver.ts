import { Injectable } from '@angular/core';
import { IGotFlightData, IGotFlightDataList } from '../../app/shared/models/interfaces/flight-data';
import { IRecieveFormData } from '../../app/shared/models/interfaces/post-flight-interface';

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
export class FlightDataResolver implements Resolve<IGotFlightData[]> {
  constructor(private flightData: FlightdataService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IGotFlightData[]> {
    return this.flightData.getFlightData(route.queryParams).pipe(
      delay(2000),
      catchError(() => {
        this.router.navigate(['']);
        return EMPTY;
      })
    );
  }
}
