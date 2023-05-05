import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { AirportService } from '../../services/airport/airport.service';
import { Subscription } from 'rxjs';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departure-from',
  templateUrl: './departure-from.component.html',
  styleUrls: ['./departure-from.component.scss']
})
export class DepartureFromComponent implements OnInit, OnDestroy {
  selectAirport: ISelectAirport[] = [];

  searchAirport = '';

  selectedDepartureValue!: string;

  selectDeparture = new FormControl('', [Validators.required]);

  subscriptions: Subscription[] = [];

  isMainPage = true;

  constructor(
    private airportService: AirportService,
    private flightSearch: FlightSearchDataService,
    private route: ActivatedRoute){}

  ngOnInit() {
    this.subscriptions.push(
      this.airportService.airportsList$$.subscribe(data => this.selectAirport = data),
      this.airportService.searchItem.subscribe(data => this.searchAirport = data),
      this.flightSearch.selectedValueDeparture$$.asObservable()
        .subscribe(value => this.selectedDepartureValue = value),
      this.selectDeparture.valueChanges
        .subscribe(value => this.flightSearch.setSelectedValueDeparture(value!)),
      this.route.url.subscribe(url => {
        this.isMainPage = url[0].path === 'main';
      })
    );
    this.selectDeparture.setValue(this.selectedDepartureValue);
  }

  filterOptions(value: string) {
    this.airportService.searchItem.next(value);
  }

  getDepartureFromErrorMessage() {
    if (this.selectDeparture.hasError('required')) {
      return 'Please select from';
    } else if (this.selectDeparture.hasError('incorrect')) {
      return 'No airports found';
    }
    return '';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe);
  }
}
