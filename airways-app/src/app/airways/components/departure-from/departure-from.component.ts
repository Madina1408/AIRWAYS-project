import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { AirportService } from '../../services/airport/airport.service';
import { Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
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

  departureControl = new FormControl(this.selectedDepartureValue, Validators.required);

  subscriptions: Subscription[] = [];

  isMainPage = true;

  isAirportSelected = false;

  @Output() departureValueChange = new EventEmitter<string>();

  constructor(
    private airportService: AirportService,
    private flightSearch: FlightSearchDataService,
    private route: ActivatedRoute){}

  ngOnInit() {
    this.airportService.getAirportsListDeparture();
    this.subscriptions.push(
      this.airportService.airportsListDeparture$$.asObservable().subscribe(data => this.selectAirport = data),
      this.airportService.searchItemDeparture$$.asObservable().subscribe(data => this.searchAirport = data),

        this.airportService.searchItemDeparture$$
        .pipe(
          distinctUntilChanged(),
          debounceTime(300),
          filter((value) => value.length >= 3),
          switchMap((query) => this.airportService.getSearchAirport(query)),
        )
        .subscribe((data: ISelectAirport[]) => {
          this.airportService.airportsListDeparture$$.next(data);
          const matchAirport: ISelectAirport[] = data;
          if (!matchAirport.length && !this.isAirportSelected) {
            this.departureControl.setErrors({ incorrect: true });
          } else if (!matchAirport.length  && this.isAirportSelected) {
            this.departureControl.setErrors(null);
          } else {
            this.departureControl.setErrors(null);
          }
        }),

      this.flightSearch.selectedValueDeparture$$.asObservable()
        .subscribe(value => this.selectedDepartureValue = value),
      this.departureControl.valueChanges
        .subscribe(value => {
          this.flightSearch.setSelectedValueDeparture(value!);
          this.departureValueChange.emit(value!);
        }),
      this.route.url.subscribe(url => {
        this.isMainPage = url[0].path === 'main';
      })
    );
    this.departureControl.setValue(this.selectedDepartureValue);
  }

  filterOptions(value: string) {
    this.isAirportSelected = false;
    this.airportService.searchItemDeparture$$.next(value);
    if (value === '') {
      this.airportService.getAirportsListDeparture();
    }
  }

  getDepartureFromErrorMessage() {
    if (this.departureControl.hasError('required')) {
      return 'Please select from';
    } else if (this.departureControl.hasError('incorrect')) {
      return 'No airports found';
    }
    return '';
  }

  onSelectedOption() {
    this.isAirportSelected = true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
