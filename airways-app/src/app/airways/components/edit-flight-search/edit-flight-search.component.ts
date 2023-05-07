import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { SharedService } from '../../services/shared/shared.service';
@Component({
  selector: 'app-edit-flight-search',
  templateUrl: './edit-flight-search.component.html',
  styleUrls: ['./edit-flight-search.component.scss'],
})
export class EditFlightSearchComponent implements OnInit {
  @Input() flightData!: IGotFlightData[][];
  forwardDate!:string
  backDate!:string;
  backFlightData!: string;
  passengers!: number;
  departureCity: string = '';
  destinationCity: string = '';
  isEditable: boolean = true;
  saveButtonStatus: boolean = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.departureCity=this.flightData[0][0].form.city;
    this.destinationCity=this.flightData[0][0].to.city;
    this.forwardDate=this.flightData[0][0].takeoffDate;
    this.backDate = this.flightData[0][0].landingDate;
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
