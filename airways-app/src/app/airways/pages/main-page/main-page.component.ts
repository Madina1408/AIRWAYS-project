import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartureFromComponent } from '../../components/departure-from/departure-from.component';
import { DestinationComponent } from '../../components/destination/destination.component';
import { AirportService } from '../../services/airport/airport.service';
import { Router } from '@angular/router';
import { ISearchFlight } from 'src/app/shared/models/interfaces/search-flight-interface';
import { RoutesPaths } from 'src/app/core/data/enums/routes-paths';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { Subscription } from 'rxjs';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  selectAirport: ISelectAirport[] = [];

  flightTypeValue!: string;

  departureValue!: string;
  destinationValue!: string;
  dateOneWayValue!: Date | null;
  dateRoundValue!: { start: Date | null, end: Date | null; };
  passengersValue!: string;

  subscriptions: Subscription[] = [];

  @ViewChild(DepartureFromComponent) departureFromComponent!: DepartureFromComponent;
  @ViewChild(DestinationComponent) destinationComponent!: DestinationComponent;

  flightSearchForm = new FormGroup({
    flightType: new FormControl(this.flightTypeValue, Validators.required),
  });

  constructor(
    private airportService: AirportService,
    private flightSearch: FlightSearchDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.airportService.airportsList$$.asObservable().subscribe(data => this.selectAirport = data),
      this.flightSearch.selectedFlightType$$.asObservable().subscribe(value => this.flightTypeValue = value),
      this.flightSearchForm.valueChanges.subscribe(value => this.flightSearch.setSelectedFlightType(value.flightType!)),

      // this.flightSearch.selectedValueDeparture$$.asObservable().subscribe(value => this.departureValue = value),
      // this.flightSearch.selectedValueDestination$$.asObservable().subscribe(value => this.destinationValue = value),
      // this.flightSearch.selectedValueDateFrom$$.asObservable().subscribe( value => this.dateFromValue = value),
      // this.flightSearch.selectedValueDateReturn$$.asObservable().subscribe( value => this.dateReturnValue = value),
      // this.flightSearch.selectedValuePassengers$$.asObservable().subscribe( value => this.passengersValue = value),
    );
    this.flightSearchForm.setValue({
      flightType: this.flightTypeValue
    });
  }

  onSwapAirports() {
    const temp = this.departureValue;
    this.departureValue = this.destinationValue;
    this.destinationValue = temp;

    this.departureFromComponent.selectDeparture.setValue(this.departureValue);
    this.destinationComponent.selectDestination.setValue(this.destinationValue);

    this.departureFromComponent.selectAirport = this.selectAirport.filter(airport => {
      const airportKeyValue = airport.city + ' ' + airport.key;
      return airportKeyValue !== this.destinationValue;
    });

    this.destinationComponent.selectAirport = this.selectAirport.filter(airport => {
      const airportKeyValue = airport.city + ' ' + airport.key;
      return airportKeyValue !== this.departureValue
    });
  }

  onDepartureChange(value: string) {
    this.departureValue = value;
  }

  onDestinationChange(value: string) {
      this.destinationValue = value;
  }

  onDateRoundChange(value: { start: Date | null, end: Date | null; }) {
    this.dateRoundValue = value;
  }

  onDateOneWayChange(value: Date | null) {
    this.dateOneWayValue = value;
  }

  onPassengersChange(value: string) {
    this.passengersValue = value;
  }

  onFormSubmit() {
    if (this.flightSearchForm.valid && this.flightTypeValue === 'one-way') {
        const queryParams: ISearchFlight = {
        fromKey: this.departureValue.slice(-3, this.departureValue.length),
        toKey: this.destinationValue.slice(-3, this.destinationValue.length),
        forwardDate: this.dateOneWayValue!.toISOString(),
        passengers: this.passengersValue,
      };
      console.log(queryParams);
      if (queryParams) {
        this.router.navigate([RoutesPaths.BookingPageStep1], { queryParams });
      }
    } else if (this.flightSearchForm.valid && this.flightTypeValue === 'round-trip') {
        const queryParams: ISearchFlight = {
        fromKey: this.departureValue.slice(-3, this.departureValue.length),
        toKey: this.destinationValue.slice(-3, this.destinationValue.length),
        forwardDate: this.dateRoundValue.start!.toISOString(),
        backDate: this.dateRoundValue.end!.toISOString(),
        passengers: this.passengersValue,
      };
      console.log(queryParams);
      if (queryParams) {
        this.router.navigate([RoutesPaths.BookingPageStep1], { queryParams });
      }
    } else {
      this.flightSearchForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
