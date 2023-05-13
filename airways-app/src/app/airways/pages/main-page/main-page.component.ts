import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartureFromComponent } from '../../components/departure-from/departure-from.component';
import { DestinationComponent } from '../../components/destination/destination.component';
import { AirportService } from '../../services/airport/airport.service';
import { Router } from '@angular/router';
import { ISearchFlight } from 'src/app/shared/models/interfaces/search-flight-interface';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { Subscription } from 'rxjs';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';
import { DateRoundComponent } from '../../components/date-round/date-round.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  selectAirportFrom: ISelectAirport[] = [];
  selectAirportTo: ISelectAirport[] = [];

  flightTypeValue!: string;

  departureValue!: string;
  destinationValue!: string;
  dateOneWayValue!: Date | null;
  dateRoundValue!: { start: Date | null; end: Date | null; };
  passengersValue!: string;

  subscriptions: Subscription[] = [];

  @ViewChild(DepartureFromComponent) departureFromComponent!: DepartureFromComponent;
  @ViewChild(DestinationComponent) destinationComponent!: DestinationComponent;
  @ViewChild(DateRoundComponent) dateRoundComponent!: DateRoundComponent;

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
      this.flightSearch.selectedFlightType$$.asObservable().subscribe(value => this.flightTypeValue = value),
      this.flightSearchForm.valueChanges.subscribe(value => this.flightSearch.setSelectedFlightType(value.flightType!)),
    );
    this.flightSearchForm.setValue({
      flightType: this.flightTypeValue
    });
  }

  onDepartureChange(value: string) {
    this.departureValue = value;
  }

  onDestinationChange(value: string) {
      this.destinationValue = value;
  }

  onDateRoundChange(value: { start: Date | null; end: Date | null; }) {
    this.dateRoundValue = value;
  }

  onDateOneWayChange(value: Date | null) {
    this.dateOneWayValue = value;
  }

  onPassengersChange(value: string) {
    this.passengersValue = value;
  }

  onSwapAirports() {
    const temp = this.departureValue;
    this.departureValue = this.destinationValue;
    this.destinationValue = temp;

    this.departureFromComponent.departureControl.setValue(this.departureValue);
    this.destinationComponent.destinationControl.setValue(this.destinationValue);

    this.airportService.getAirportsListDeparture();
    this.departureFromComponent.selectAirport = this.selectAirportFrom.filter(airport => {
      const airportKeyValue = airport.city + ' ' + airport.key;
      return airportKeyValue !== this.destinationValue;
    });

    this.airportService.getAirportsListDestination();
    this.destinationComponent.selectAirport = this.selectAirportTo.filter(airport => {
      const airportKeyValue = airport.city + ' ' + airport.key;
      return airportKeyValue !== this.departureValue;
    });
  }

  onFormSubmit() {
    if (this.flightSearchForm.valid && this.flightTypeValue === 'one-way') {
      if (this.dateOneWayValue) {
        const queryParams: ISearchFlight = {
          fromKey: this.departureValue.slice(-3, this.departureValue.length),
          // fromCity: this.departureValue.slice(0, -4),
          toKey: this.destinationValue.slice(-3, this.destinationValue.length),
          // toCity: this.destinationValue.slice(0, -4),
          forwardDate: this.dateOneWayValue!.toISOString(),
          passengers: this.passengersValue,
        };
        if (queryParams) {
          this.router.navigate([RoutesPaths.BookingPageStep1], { queryParams });
        }
      }
    } else if (this.flightSearchForm.valid && this.flightTypeValue === 'round-trip') {
        if (this.dateRoundValue.start && this.dateRoundValue.end) {
          const queryParams: ISearchFlight = {
            fromKey: this.departureValue.slice(-3, this.departureValue.length),
            // fromCity: this.departureValue.slice(0, -4),
            toKey: this.destinationValue.slice(-3, this.destinationValue.length),
            // toCity: this.destinationValue.slice(0, -4),
            forwardDate: this.dateRoundValue.start.toISOString(),
            backDate: this.dateRoundValue.end.toISOString(),
            passengers: this.passengersValue,
          }
          if (queryParams) {
            this.router.navigate([RoutesPaths.BookingPageStep1], { queryParams });
          }
        } else {
          this.dateRoundComponent.dateRoundControl.markAllAsTouched();
        };
    } else {
      this.flightSearchForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
