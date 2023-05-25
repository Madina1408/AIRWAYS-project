import { Component, Input, OnInit } from '@angular/core';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { PassengersService } from '../../services/passengers/passengers.service';
import { IPassengerData } from 'src/app/shared/models/interfaces/passengers-interface';

@Component({
  selector: 'app-summary-passengers',
  templateUrl: './summary-passengers.component.html',
  styleUrls: ['./summary-passengers.component.scss'],
})
export class SummaryPassengersComponent implements OnInit {
  @Input() selectedFlight!: IGotFlightData;
  @Input() isForward: boolean = true;
  passengersArray?:IPassengerData[];
  passengerSeat?:number;
  constructor(private passengerService: PassengersService) {}
  ngOnInit(): void {
    console.log(this.selectedFlight.takeoffDate);
    this.passengersArray = this.passengerService.getAllPassengers();
    console.log(this.passengersArray);
  }
}
