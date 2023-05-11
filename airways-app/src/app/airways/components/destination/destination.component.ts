import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { AirportService } from '../../services/airport/airport.service';
import { Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
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

  destinationControl = new FormControl(this.selectedDestinationValue, Validators.required);

  subscriptions: Subscription[] = [];

  isMainPage = true;

  isAirportSelected = false;

  @Output() destinationValueChange = new EventEmitter<string>();

  constructor(
    private airportService: AirportService,
    private flightSearch: FlightSearchDataService,
    private route: ActivatedRoute){}

  ngOnInit() {
    this.airportService.getAirportsListDestination();
    this.subscriptions.push(
      this.airportService.airportsListDestination$$.asObservable().subscribe(data => this.selectAirport = data),
      this.airportService.searchItemDestination$$.asObservable().subscribe(data => this.searchAirport = data),

      this.airportService.searchItemDestination$$
        .pipe(
          distinctUntilChanged(),
          debounceTime(300),
          filter((value) => value.length >= 3),
          switchMap((query) => this.airportService.getSearchAirport(query)),
        )
        .subscribe((data: ISelectAirport[]) => {
          this.airportService.airportsListDestination$$.next(data);
          const matchAirport: ISelectAirport[] = data;
          if (!matchAirport.length && !this.isAirportSelected) {
            this.destinationControl.setErrors({ incorrect: true });
          } else if (!matchAirport.length  && this.isAirportSelected) {
            this.destinationControl.setErrors(null);
          } else {
            this.destinationControl.setErrors(null);
          }
        }),

      this.flightSearch.selectedValueDestination$$.asObservable()
        .subscribe(value => this.selectedDestinationValue = value),

      this.destinationControl.valueChanges
        .subscribe(value => {
          this.flightSearch.setSelectedValueDestination(value!);
          this.destinationValueChange.emit(value!);
        }),

      this.route.url.subscribe(url => {
        this.isMainPage = url[0].path === 'main';
      })
    );
    this.destinationControl.setValue(this.selectedDestinationValue);
  }

  filterOptions(value: string) {
    this.isAirportSelected = false;
    this.airportService.searchItemDestination$$.next(value);
    if (value === '') {
      this.airportService.getAirportsListDestination();
    }
  }

  getDestinationErrorMessage() {
    if (this.destinationControl.hasError('required')) {
      return 'Please select destination';
    } else if (this.destinationControl.hasError('incorrect')) {
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
