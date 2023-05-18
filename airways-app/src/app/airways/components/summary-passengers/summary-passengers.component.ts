import { Component, Input, OnInit } from '@angular/core';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';

@Component({
  selector: 'app-summary-passengers',
  templateUrl: './summary-passengers.component.html',
  styleUrls: ['./summary-passengers.component.scss']
})
export class SummaryPassengersComponent implements OnInit {
  @Input() selectedFlight!:IGotFlightData;
  @Input() isForward: boolean = true;
  ngOnInit(): void {
    console.log(this.selectedFlight.takeoffDate);
  }
}
