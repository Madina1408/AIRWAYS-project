import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/auth/services/user/user.service';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

interface cities {
  deparrtureCity: string;
  destination: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService implements OnInit {
  private deparrtureCity = new BehaviorSubject<string>('');
  currentDeparrtureCity = this.deparrtureCity.asObservable();
  private destination = new BehaviorSubject<string>('');
  currentDestination = this.destination.asObservable();
  private editableStatus = new BehaviorSubject<boolean>(false);
  currentEditableStatus = this.editableStatus.asObservable();
  selectedForwardFlight = new BehaviorSubject<any>([]);
  selectedBackwardFlight = new BehaviorSubject<any>([]);

  userId: string = this.userService.getCurrentUserId();
  existingCart: IGotFlightData[][] =
    this.localStorageService.getTypedStorageItem(this.userId);
  addToCardNumber = new BehaviorSubject<number>(this.existingCart!.length | 0);
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  getAddToCardNumber(number: number) {
    this.addToCardNumber.next(number);
  }

  getCities(destination: string, deparrtureCity: string) {
    this.destination.next(destination);
    this.deparrtureCity.next(deparrtureCity);
  }
  getEditableStatus(status: boolean) {
    this.editableStatus.next(status);
  }
  passSelectedForwardFlight(data: any) {
    this.selectedForwardFlight.next(data);
  }

  passSelectedBackwardFlight(data: any) {
    this.selectedBackwardFlight.next(data);
  }
}
