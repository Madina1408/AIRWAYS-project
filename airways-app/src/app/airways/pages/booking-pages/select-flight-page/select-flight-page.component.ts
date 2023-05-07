import { Component, OnInit, NgZone   } from '@angular/core';
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
  flightData!: IGotFlightData[][];
  forwardFlightData: IGotFlightData[] = [];
  backFlightData: IGotFlightData[] = [];
  isEditing: boolean = false;
  isSaving: boolean = false;
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
    private flightDataService: FlightdataService,
    private ngZone: NgZone
  ) {
    // this.sharedService.currentEditableStatus.subscribe((status) => {
    //   this.isEditing = !status;
    // });
    // this.flightSearchDataService.selectedFlightType$$.subscribe((val) => {
    //   this.flightTypeValue = val;
    // });
    // this.flightData = this.activatedRoute.snapshot.data['flights'];
    // console.log(this.flightData);

    // for (let i = 0; i < this.flightData.length; i++) {
    //   this.forwardFlightData.push(this.flightData[i][0]);
    //   this.backFlightData.push(this.flightData[i][1]);
    // }
  }
  ngOnInit(): void {
    this.sharedService.currentEditableStatus.subscribe((status) => {
      this.isEditing = !status;
    });
    this.flightSearchDataService.selectedFlightType$$.subscribe((val) => {
      this.flightTypeValue = val;
    });
    this.flightData = this.activatedRoute.snapshot.data['flights'];
    for (let i = 0; i < this.flightData.length; i++) {
      this.forwardFlightData.push(this.flightData[i][0]);
      this.backFlightData.push(this.flightData[i][1]);
    }
  }

  updateSearchData(): void {
    this.flightSearchDataService.selectedValueDeparture$$.asObservable().subscribe((res) => {
      this.editSearchData.fromKey = res.slice(-3);
    });
    this.flightSearchDataService.selectedValueDestination$$.asObservable().subscribe(
      (res) => {
        this.editSearchData.toKey = res.slice(-3);
      }
    );
    this.flightSearchDataService.selectedValueDateFrom$$.asObservable().subscribe((res) => {
      this.editSearchData.forwardDate! = res!.toISOString();
    });
    this.flightSearchDataService.selectedValueDateReturn$$.asObservable().subscribe(
      (res) => {
        this.editSearchData.backDate! = res!.toISOString();
      }
    );
  }


  updatePostRequestAfterSaveButtonClicked():void {
    this.isSaving=true;
    if (this.isSaving) {
      this.updateSearchData();
      this.flightDataService
        .getFlightData(this.editSearchData)
        .subscribe((res) => {
          this.flightData = [res];
          console.log(res);
          for (let i = 0; i < this.flightData.length; i++) {
            this.forwardFlightData.push(this.flightData[i][0]);
            this.backFlightData.push(this.flightData[i][1]);
          }
          this.ngZone.run(() => {});
        });
    }
  }
}
