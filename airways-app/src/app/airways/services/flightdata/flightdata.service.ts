import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,forkJoin } from 'rxjs';
import { IPostFlightData } from '../../../shared/models/interfaces/post-flight-interface';
import { IGotFlightDataList } from '../../../shared/models/interfaces/flight-data';
import {IRecieveFormData} from '../../../shared/models/interfaces/post-flight-interface'
@Injectable({
  providedIn: 'root',
})
export class FlightdataService {
  data: IPostFlightData = {
    fromKey: 'dsa',
    toKey: 'dsa',
    forwardDate: '2023-09-21T00:00:00.000Z',
    backDate: '2023-10-11T00:00:00.000Z',
  };
  constructor(private http: HttpClient) {}

  getFlightData(postFlightData:any):Observable<IGotFlightDataList[]> {
    const dates: IPostFlightData[] = [];

    for (let i = 0; i < 7; i++) {
      const newForwardDate = new Date(postFlightData.forwardDate);
      newForwardDate.setDate(newForwardDate.getDate() + i);


      let newBackDate = new Date(postFlightData.backDate);

      newBackDate.setDate(newBackDate.getDate() + i);

      if (postFlightData.backDate===undefined){
        dates.push({
          fromKey: this.data.fromKey,
          toKey: this.data.toKey,
          forwardDate: newForwardDate.toISOString(),
          backDate:''
        })
      } else{
        dates.push({
        fromKey: this.data.fromKey,
        toKey: this.data.toKey,
        forwardDate: newForwardDate.toISOString(),
        backDate: newBackDate.toISOString(),
      });
      }

    }
    console.log(dates);
    const requests: Observable<IGotFlightDataList>[] = dates.map(date =>
      this.http.post<IGotFlightDataList>('https://api.air-ways.online/search/flight', date)
    );

    return forkJoin(requests);
    };
  }

