import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { IAirport } from 'src/app/shared/models/interfaces/airport-interface';
import { AirportService } from '../../services/airport/airport.service';
import { Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';
import { ActivatedRoute } from '@angular/router';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit, OnDestroy {
  @Output() destinationValueChange = new EventEmitter<string>();

  selectAirport: IAirport[] = [];

  searchAirport = '';

  selectedDestinationValue!: string;

  destinationControl = new FormControl(this.selectedDestinationValue, [Validators.required, Validators.minLength(3)]);

  subscriptions: Subscription[] = [];

  isMainPage = true;

  isAirportSelected = false;

  constructor(
    private airportService: AirportService,
    private flightSearch: FlightSearchDataService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.airportService.getAirportsListDestination();
    this.subscriptions.push(
      this.airportService.airportsListDestination$$.subscribe(data => this.selectAirport = data),
      this.airportService.searchItemDestination$$.subscribe(data => this.searchAirport = data),

      this.airportService.searchItemDestination$$
        .pipe(
          distinctUntilChanged(),
          debounceTime(300),
          filter((value) => value.length >= 3),
          switchMap((query) => this.airportService.getSearchAirport(query)),
        )
        .subscribe((data: IAirport[]) => {
          this.airportService.airportsListDestination$$.next(data);
          const matchAirport: IAirport[] = data;
          if (!matchAirport.length && !this.isAirportSelected) {
            this.destinationControl.setErrors({ incorrect: true });
          } else if (!matchAirport.length  && this.isAirportSelected) {
            this.destinationControl.setErrors(null);
          } else {
            this.destinationControl.setErrors(null);
          }
        }),

      this.flightSearch.selectedValueDestination$$
        .subscribe(value => this.selectedDestinationValue = value),

      this.destinationControl.valueChanges
        .subscribe(value => {
          if (this.destinationControl.valid) {
            this.flightSearch.setSelectedValueDestination(value!);
            this.destinationValueChange.emit(value!);
          }
        }),

      this.route.url.subscribe(url => {
        this.isMainPage = url[0].path === RoutesPaths.MainPage;
      })
    );
    this.destinationControl.setValue(this.selectedDestinationValue);
  }

  filterOptions(value: string): void {
    this.isAirportSelected = false;
    this.airportService.searchItemDestination$$.next(value);
    if (value === '') {
      this.airportService.getAirportsListDestination();
    }
  }

  getDestinationErrorMessage(): string {
    if (this.destinationControl.hasError('required')) {
      return 'Please select destination';
    } else if (this.destinationControl.hasError('incorrect')) {
      return 'No airports found';
    } else if (this.destinationControl.hasError('minlength')) {
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
