import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IPostFlightData } from '../../../shared/models/interfaces/post-flight-interface';
import {IGotFlightDataList} from '../../../shared/models/interfaces/flight-data'
@Injectable({
  providedIn: 'root'
})
export class FlightdataService {

  constructor(private http:HttpClient) { }
  data:IPostFlightData={
    "fromKey": "dsa",
    "toKey": "dsa",
    "forwardDate": "2023-09-21T00:00:00.000Z",
    "backDate": "2023-10-11T00:00:00.000Z"
  }
  onclick():Observable<IGotFlightDataList>{
    const body = this.data;
    return this.http.post<IGotFlightDataList>('https://api.air-ways.online/search/flight',body);
  }
}
