import { Component, Input, OnInit} from '@angular/core';
import { SharedService } from 'src/app/airways/services/shared/shared.service';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss']
})
export class SummaryPageComponent implements OnInit {
  forwardData!:IGotFlightData;
  backwardData!:IGotFlightData;
  constructor(private sharedService:SharedService){}
  ngOnInit(): void {
    this.sharedService.selectedForwardFlight.asObservable().subscribe(res=>{
      this.forwardData=res;
      console.log(this.forwardData);
    });
    this.sharedService.selectedBackwardFlight.asObservable().subscribe(res=>{
      this.backwardData=res;
      console.log(this.backwardData);
    })
  }
}
