import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';

interface cities {
  deparrtureCity: string;
  destination: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private deparrtureCity = new BehaviorSubject<string>('');
  currentDeparrtureCity = this.deparrtureCity.asObservable();
  private destination = new BehaviorSubject<string>('');
  currentDestination = this.destination.asObservable();
  private editableStatus = new BehaviorSubject<boolean>(false);
  currentEditableStatus = this.editableStatus.asObservable();
  selectedForwardFlight=new BehaviorSubject<any>([]);
  selectedBackwardFlight=new BehaviorSubject<any>([]);

  getCities(destination: string, deparrtureCity: string) {
    this.destination.next(destination);
    this.deparrtureCity.next(deparrtureCity);
  }

  getEditableStatus(status:boolean){
    this.editableStatus.next(status);
  }
  passSelectedForwardFlight(data:any){
    this.selectedForwardFlight.next(data);
  }

  passSelectedBackwardFlight(data:any){
    this.selectedBackwardFlight.next(data);
  }
}
