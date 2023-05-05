import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGotFlightData } from '../../../../shared/models/interfaces/flight-data';
import { SharedService } from 'src/app/airways/services/shared/shared.service';
import { FlightSearchDataService } from 'src/app/airways/services/flight-search-data/flight-search-data.service';
@Component({
  selector: 'app-select-flight-page',
  templateUrl: './select-flight-page.component.html',
  styleUrls: ['./select-flight-page.component.scss'],
})
export class SelectFlightPageComponent {
  flightData: IGotFlightData[][];
  forwardFlightData: IGotFlightData[] = [];
  backFlightData: IGotFlightData[] = [];
  isEditing:boolean=false;
  flightTypeValue!:string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService:SharedService,
    private flightSearchDataService: FlightSearchDataService
  ) {
    this.sharedService.currentEditableStatus.subscribe(status=>{
      this.isEditing=!status
    })
    flightSearchDataService.selectedFlightType$$.subscribe(val=>{
      this.flightTypeValue=val
    })
    this.flightData = this.activatedRoute.snapshot.data['flights'];
    console.log(this.flightData);

    for (let i = 0; i < this.flightData.length; i++) {
      this.forwardFlightData.push(this.flightData[i][0]);
      this.backFlightData.push(this.flightData[i][1]);
    }
  }
}
