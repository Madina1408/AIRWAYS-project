import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private editableStatus = new BehaviorSubject<boolean>(true);
  currentEditableStatus = this.editableStatus.asObservable()
  // private disabled = new BehaviorSubject<boolean>(true);
  // currentStatusOnDisabled=this.disabled.asObservable()

  getCities(destination: string, deparrtureCity: string) {
    this.destination.next(destination);
    this.deparrtureCity.next(deparrtureCity);
  }

  getEditableStatus(status:boolean){
    this.editableStatus.next(status);
  }

  // updateDisabledStatus(status:boolean){
  //   this.disabled.next(status);
  // }

}
