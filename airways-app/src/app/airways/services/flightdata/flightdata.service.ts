import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,forkJoin } from 'rxjs';
import { IPostFlightData } from '../../../shared/models/interfaces/post-flight-interface';
import { IGotFlightData, IGotFlightDataList } from '../../../shared/models/interfaces/flight-data';
import {IRecieveFormData} from '../../../shared/models/interfaces/post-flight-interface'
@Injectable({
  providedIn: 'root',
})
export class FlightdataService {
  constructor(private http: HttpClient) {}

  getFlightData(postFlightData:any):Observable<IGotFlightData[][]> {
    const dates: IPostFlightData[] = [];

    for (let i = 0; i < 7; i++) {
      const newForwardDate = new Date(postFlightData.forwardDate);
      newForwardDate.setDate(newForwardDate.getDate() + i);

      let newBackDate = new Date(postFlightData.backDate);

      newBackDate.setDate(newBackDate.getDate() + i);

      if (postFlightData.backDate===undefined){
        dates.push({
          fromKey: postFlightData.fromKey,
          toKey: postFlightData.toKey,
          forwardDate: newForwardDate.toISOString(),
          backDate:''
        })
      } else{
        dates.push({
        fromKey: postFlightData.fromKey,
        toKey: postFlightData.toKey,
        forwardDate: newForwardDate.toISOString(),
        backDate: newBackDate.toISOString(),
      });
      }

    }
    const requests: Observable<IGotFlightData[]>[] = dates.map(date =>
      this.http.post<IGotFlightData[]>('https://api.air-ways.online/search/flight', date)
    );
    return forkJoin(requests);
    };
  }

