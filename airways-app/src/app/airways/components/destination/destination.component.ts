import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { AirportService } from '../../services/airport/airport.service';
import { Subscription } from 'rxjs';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit, OnDestroy {
  selectAirport: ISelectAirport[] = [];

  searchAirport = '';

  selectedDestinationValue!: string;

  selectDestination = new FormControl('', [Validators.required]);

  subscriptions: Subscription[] = [];

  isMainPage = true;

  constructor(
    private airportService: AirportService,
    private flightSearch: FlightSearchDataService,
    private route: ActivatedRoute){}

  ngOnInit() {
    this.airportService.getAirportsList();
    this.subscriptions.push(
      this.airportService.airportsList$$.asObservable().subscribe(data => this.selectAirport = data),
      this.airportService.searchItem$$.asObservable().subscribe(data => this.searchAirport = data),
      this.flightSearch.selectedValueDestination$$.asObservable()
        .subscribe(value => this.selectedDestinationValue = value),
      this.selectDestination.valueChanges
        .subscribe(value => this.flightSearch.setSelectedValueDestination(value!)),
        this.route.url.subscribe(url => {
          this.isMainPage = url[0].path === 'main';
        })
    );
    this.selectDestination.setValue(this.selectedDestinationValue);
  }

  filterOptions(value: string) {
    this.airportService.searchItem$$.next(value);
  }

  getDestinationErrorMessage() {
    if (this.selectDestination.hasError('required')) {
      return 'Please select destination';
    } else if (this.selectDestination.hasError('incorrect')) {
      return 'No airports found';
    }
    return '';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe);
  }
}
