import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightSearchDataService } from 'src/app/airways/services/flight-search-data/flight-search-data.service';
import { SharedService } from 'src/app/airways/services/shared/shared.service';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
import { ISearchFlight } from 'src/app/shared/models/interfaces/search-flight-interface';

@Component({
  selector: 'app-passengers-page',
  templateUrl: './passengers-page.component.html',
  styleUrls: ['./passengers-page.component.scss'],
})
export class PassengersPageComponent implements OnInit {
  queryParams: ISearchFlight = {
    fromKey: '',
    toKey: '',
    forwardDate: '',
    backDate: '',
    passengers: '',
    fromCity: '',
    toCity: '',
  };
  constructor(private activateRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((res) => {
      this.queryParams.backDate = res['backDate'];
      this.queryParams.forwardDate = res['forwardDate'];
      this.queryParams.toCity = res['toCity'];
      this.queryParams.fromCity = res['fromCity'];
      this.queryParams.toKey = res['toKey'];
      this.queryParams.fromKey = res['fromKey'];
      this.queryParams.passengers = res['passengers'];
    });
  }

  continueToNextStep() {
    this.router.navigate([RoutesPaths.BookingPageStep3], {
      queryParams: this.queryParams,
    });
  }
}
