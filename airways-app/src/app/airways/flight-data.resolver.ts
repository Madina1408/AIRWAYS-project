import { Injectable } from '@angular/core';
import { IGotFlightData } from '../../app/shared/models/interfaces/flight-data';
import { ISearchFlight } from '../shared/models/interfaces/search-flight-interface';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { FlightdataService } from './services/flightdata/flightdata.service';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightDataResolver implements Resolve<IGotFlightData[][]> {
  queryParams:any;

  constructor(private flightData: FlightdataService, private router: Router, private activatedRoute:ActivatedRoute) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IGotFlightData[][]> {
    // this.activatedRoute.queryParams.subscribe(val=>{
    //   this.queryParams=val
    //   console.log(val);
    // });
    return this.flightData.getFlightData(route.queryParams).pipe(
      delay(2000),
      catchError(() => {
        this.router.navigate(['']);
        return EMPTY;
      })
    );
  }
}
