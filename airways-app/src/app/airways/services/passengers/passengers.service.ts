import { Injectable } from '@angular/core';
import { IPassengerContacts, IPassengerData } from 'src/app/shared/models/interfaces/passengers-interface';

@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  private passengers: IPassengerData[] = [];
  private contactDetails!: IPassengerContacts;

  setPassenger(index: number, passenger: IPassengerData) {
    this.passengers[index - 1] = passenger;
  }

  getPassengerByIndex(index: number): IPassengerData | undefined {
    return this.passengers[index - 1];
  }

  getAllPassengers(): IPassengerData[] | undefined {
    return this.passengers;
  }

  setContactDetails(contactDetails: IPassengerContacts) {
    this.contactDetails = contactDetails;
  }

  getContactDetails(): IPassengerContacts | undefined {
    return this.contactDetails;
  }
}
