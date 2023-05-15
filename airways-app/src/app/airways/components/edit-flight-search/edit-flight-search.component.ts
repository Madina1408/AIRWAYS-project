import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { SharedService } from '../../services/shared/shared.service';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
@Component({
  selector: 'app-edit-flight-search',
  templateUrl: './edit-flight-search.component.html',
  styleUrls: ['./edit-flight-search.component.scss'],
})
export class EditFlightSearchComponent implements OnInit {
  @Input() flightData!: IGotFlightData[][];
  @Output() callParentMethod: EventEmitter<any> = new EventEmitter();
  forwardDate!: string;
  backDate!: string;
  backFlightData!: string;
  passengers!: number;
  departureCity: string = '';
  destinationCity: string = '';
  isEditing: boolean = false;
  saveButtonStatus: boolean = false;
  showEditDiv: boolean = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        if (currentUrl.split('/')[2]?.startsWith('step1')) {
          this.showEditDiv = true;
        } else {
          this.showEditDiv = false;
        }
      }
    });
  }
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      this.passengers = params['passengers'];
      this.forwardDate = params['forwardDate'];
      this.backDate = params['backDate'];
      this.destinationCity = params['toCity'];
      this.departureCity = params['fromCity'];
    });
  }
  editPostRequest() {
    this.sharedService.getEditableStatus(true);
    this.isEditing = false;
    this.saveButtonStatus = true;
  }
  saveSearchResults() {
    this.callParentMethod.emit();
    this.saveButtonStatus = false;
  }
  cancelSearchresults() {
    this.sharedService.getEditableStatus(false);
    this.isEditing = false;
    this.saveButtonStatus = false;
  }
}
