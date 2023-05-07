import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGotFlightData } from '../../../../shared/models/interfaces/flight-data';
import { SharedService } from 'src/app/airways/services/shared/shared.service';
import { FlightSearchDataService } from 'src/app/airways/services/flight-search-data/flight-search-data.service';
import { IPostFlightData } from 'src/app/shared/models/interfaces/post-flight-interface';
import { FlightdataService } from 'src/app/airways/services/flightdata/flightdata.service';
@Component({
  selector: 'app-select-flight-page',
  templateUrl: './select-flight-page.component.html',
  styleUrls: ['./select-flight-page.component.scss'],
})
export class SelectFlightPageComponent implements OnInit {
  flightData: IGotFlightData[][];
  forwardFlightData: IGotFlightData[] = [];
  backFlightData: IGotFlightData[] = [];
  isEditing: boolean = false;
  flightTypeValue!: string;
  editSearchData: IPostFlightData = {
    fromKey: '',
    toKey: '',
    forwardDate: '',
    backDate: '',
  };
  fromKey: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private flightSearchDataService: FlightSearchDataService,
    private flightDataService: FlightdataService
  ) {
    this.sharedService.currentEditableStatus.subscribe((status) => {
      this.isEditing = !status;
    });
    this.flightSearchDataService.selectedFlightType$$.subscribe((val) => {
      this.flightTypeValue = val;
    });
    this.flightData = this.activatedRoute.snapshot.data['flights'];
    console.log(this.flightData);

    for (let i = 0; i < this.flightData.length; i++) {
      this.forwardFlightData.push(this.flightData[i][0]);
      this.backFlightData.push(this.flightData[i][1]);
    }
  }
  ngOnInit(): void {
    // this.flightSearchDataService.selectedValueDeparture$$.subscribe(res=>{
    //   this.fromKey=res
    //   console.log(this.fromKey);
    // })
  }
  updatePostRequestAfterSaveButtonClicked() {
    this.flightSearchDataService.selectedValueDeparture$$.subscribe((res) => {
      this.editSearchData.fromKey = res;
      console.log(this.editSearchData.fromKey);
    });
  }
}
