import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGotFlightData } from '../../../../shared/models/interfaces/flight-data';
import { SharedService } from 'src/app/airways/services/shared/shared.service';
import { FlightSearchDataService } from 'src/app/airways/services/flight-search-data/flight-search-data.service';
import { FlightdataService } from 'src/app/airways/services/flightdata/flightdata.service';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
import { Router } from '@angular/router';
import { ISearchFlight } from 'src/app/shared/models/interfaces/search-flight-interface';
import { StepperService } from 'src/app/core/services/stepper/stepper.service';
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
  isForwardSelected: string = '';
  isBackwardSelected: string = '';
  disabled: boolean = true;
  flightTypeValue!: string;
  queryParams: ISearchFlight = {
    fromKey: '',
    toKey: '',
    forwardDate: '',
    backDate: '',
    passengers: '',
    fromCity: '',
    toCity: '',
  };
  fromKey: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private flightSearchDataService: FlightSearchDataService,
    private flightDataService: FlightdataService,
    private router: Router,
    private stepperService: StepperService
  ) {}
  ngOnInit(): void {
    this.sharedService.currentEditableStatus.subscribe((status) => {
      this.isEditing = status;
    });
    this.flightSearchDataService.selectedFlightType$$.subscribe((val) => {
      this.flightTypeValue = val;
    });
    this.activatedRoute.data.subscribe((res) => {
      this.forwardFlightData = [];
      this.backFlightData = [];
      this.flightData = res['flights'];
      for (let i = 0; i < this.flightData.length; i++) {
        this.forwardFlightData.push(this.flightData[i][0]);
        this.backFlightData.push(this.flightData[i][1]);
      }
    });
  }

  updateSearchData(): void {
    this.flightSearchDataService.selectedValueDeparture$$
      .asObservable()
      .subscribe((res) => {
        this.queryParams.fromKey = res.slice(-3);
      });
    this.flightSearchDataService.selectedValueDestination$$
      .asObservable()
      .subscribe((res) => {
        this.queryParams.toKey = res.slice(-3);
      });
    this.flightSearchDataService.selectedValueDateFrom$$
      .asObservable()
      .subscribe((res) => {
        this.queryParams.forwardDate = res?.toISOString();
      });
    this.flightSearchDataService.selectedValueDateReturn$$
      .asObservable()
      .subscribe((res) => {
        this.queryParams.backDate = res?.toISOString();
      });
    this.flightSearchDataService.selectedValuePassengers$$
      .asObservable()
      .subscribe((res) => {
        this.queryParams.passengers! = res;
      });
    this.flightSearchDataService.selectedValueDeparture$$
      .asObservable()
      .subscribe((res) => {
        this.queryParams.fromCity = res;
      });
    this.flightSearchDataService.selectedValueDestination$$
      .asObservable()
      .subscribe((res) => {
        this.queryParams.toCity = res;
      });
  }

  updatePostRequestAfterSaveButtonClicked(): void {
    this.isEditing = false;
    this.isSaving = true;
    this.updateSearchData();
    const queryParams = this.queryParams;
    if (this.isSaving) {
      this.router.navigate([RoutesPaths.BookingPageStep1], { queryParams });
    }
  }

  continueToNextStep() {
    this.updateSearchData();
    this.queryParams.forwardDate = this.isForwardSelected;
    this.queryParams.backDate = this.isBackwardSelected;
    this.router.navigate([RoutesPaths.BookingPageStep2], {
      queryParams: this.queryParams,
    });
    this.stepperService.nextStep();
  }

  markForwardFlightStatus(status: any): void {
    this.isForwardSelected = status;
    // console.log(this.isForwardSelected);
  }

  markBackwardFlightStatus(status: any) {
    this.isBackwardSelected = status;
    // console.log(this.isBackwardSelected);
  }
}
