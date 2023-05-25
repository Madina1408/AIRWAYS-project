import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IAirport } from 'src/app/shared/models/interfaces/airport-interface';
import { AirportService } from '../../services/airport/airport.service';
import { Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';
import { ActivatedRoute } from '@angular/router';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';

@Component({
  selector: 'app-departure-from',
  templateUrl: './departure-from.component.html',
  styleUrls: ['./departure-from.component.scss']
})
export class DepartureFromComponent implements OnInit, OnDestroy {
  @Output() departureValueChange = new EventEmitter<string>();

  selectAirport: IAirport[] = [];

  searchAirport = '';

  selectedDepartureValue!: string;

  departureControl = new FormControl(this.selectedDepartureValue, [Validators.required, Validators.minLength(3)]);

  subscriptions: Subscription[] = [];

  isMainPage = true;

  isAirportSelected = false;

  constructor(
    private airportService: AirportService,
    private flightSearch: FlightSearchDataService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.airportService.getAirportsListDeparture();
    this.subscriptions.push(
      this.airportService.airportsListDeparture$$.subscribe(data => this.selectAirport = data),
      this.airportService.searchItemDeparture$$.subscribe(data => this.searchAirport = data),

      this.airportService.searchItemDeparture$$
        .pipe(
          distinctUntilChanged(),
          debounceTime(300),
          filter((value) => value.length >= 3),
          switchMap((query) => this.airportService.getSearchAirport(query)),
        )
        .subscribe((data: IAirport[]) => {
          this.airportService.airportsListDeparture$$.next(data);
          const matchAirport: IAirport[] = data;
          if (!matchAirport.length && !this.isAirportSelected) {
            this.departureControl.setErrors({ incorrect: true });
          } else if (!matchAirport.length && this.isAirportSelected) {
            this.departureControl.setErrors(null);
          } else {
            this.departureControl.setErrors(null);
          }
      }),

      this.flightSearch.selectedValueDeparture$$
        .subscribe(value => this.selectedDepartureValue = value),
      this.departureControl.valueChanges
        .subscribe(value => {
          if (this.departureControl.valid) {
            this.flightSearch.setSelectedValueDeparture(value!);
            this.departureValueChange.emit(value!);
          }
        }),
      this.route.url.subscribe(url => {
        this.isMainPage = url[0].path === RoutesPaths.MainPage;
      })
    );
    this.departureControl.setValue(this.selectedDepartureValue);
  }

  filterOptions(value: string): void {
    this.isAirportSelected = false;
    this.airportService.searchItemDeparture$$.next(value);
    if (value === '') {
      this.airportService.getAirportsListDeparture();
    }
  }

  getDepartureFromErrorMessage(): string {
    if (this.departureControl.hasError('required')) {
      return 'Please select from';
    } else if (this.departureControl.hasError('incorrect')) {
      return 'No airports found';
    } else if (this.departureControl.hasError('minlength')) {
      return 'The name/key of airport must be at least 3 characters long';
    }
    return '';
  }

  onSelectedOption(): void {
    this.isAirportSelected = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
