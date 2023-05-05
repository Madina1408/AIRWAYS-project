import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FlightdataService } from '../../services/flightdata/flightdata.service';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { SharedService } from '../../services/shared/shared.service';
@Component({
  selector: 'app-edit-flight-search',
  templateUrl: './edit-flight-search.component.html',
  styleUrls: ['./edit-flight-search.component.scss'],
})
export class EditFlightSearchComponent implements OnInit {
  @Input() flightData!: IGotFlightData[][];
  forwardFlightData!: IGotFlightData;
  backFlightData!: string;
  passengers!: number;
  departureCity: string = '';
  destinationCity: string = '';
  isEditable: boolean = true;
  saveButtonStatus: boolean = false;
  constructor(
    private http: HttpClient,
    private flightService: FlightdataService,
    private activateRoute: ActivatedRoute,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.sharedService.currentDeparrtureCity.subscribe((city) => {
      this.departureCity = city;
    });
    this.sharedService.currentDestination.subscribe((city) => {
      this.destinationCity = city;
    });
    this.forwardFlightData = this.flightData[0][0];
    if(this.flightData[0][1]){
      this.backFlightData = this.flightData[0][1].takeoffDate;
    } else{
      this.backFlightData='';
    }
    this.activateRoute.queryParams.subscribe((params) => {
      this.passengers = params['passengers'];
    });
  }

  editPostRequest() {
    this.sharedService.getEditableStatus(!this.isEditable);
    this.isEditable = !this.isEditable;
    this.saveButtonStatus = !this.saveButtonStatus;
  }
}
