import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartureFromComponent } from '../../components/departure-from/departure-from.component';
import { DestinationComponent } from '../../components/destination/destination.component';
import { AirportService } from '../../services/airport.service';
import { Router } from '@angular/router';
import { ISearchFlight } from 'src/app/shared/models/interfaces/search-flight-interface';
import { RoutesPaths } from 'src/app/core/data/enums/routes-paths';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  isOneWayTrip = false;

  departureValue = '';
  destinationValue = '';
  dateOneWayValue = '';
  dateRoundValue!: { start: string, end: string; };
  passengersValue = '';

  @ViewChild(DepartureFromComponent) departureFromComponent!: DepartureFromComponent;
  @ViewChild(DestinationComponent) destinationComponent!: DestinationComponent;

  flightSearchForm = new FormGroup({
    flightType: new FormControl('round-trip', Validators.required),
  });

  constructor(
    private airportService: AirportService,
    private router: Router
  ) {}

  onFlightTypeChange() {
    this.isOneWayTrip = !this.isOneWayTrip;
  }

  onDepartureChange(value: string) {
    this.departureValue = value;
  }

  onDestinationChange(value: string) {
      this.destinationValue = value;
  }

  onDateRoundChange(value: { start: string, end: string; }) {
    this.dateRoundValue = value;
  }

  onDateOneWayChange(value: string) {
    this.dateOneWayValue = value;
  }

  onPassengersChange(value: string) {
    this.passengersValue = value;
  }

  onSwapAirports() {
    const temp = this.departureValue;
    this.departureValue = this.destinationValue;
    this.destinationValue = temp;

    this.departureFromComponent.selectDeparture.setValue(this.departureValue);
    this.destinationComponent.selectDestination.setValue(this.destinationValue);

    this.departureFromComponent.selectAirport = this.airportService.airportItems.filter(airport => {
      const airportKeyValue = airport.city + ' ' + airport.key;
      return airportKeyValue !== this.destinationValue;
    });

    this.destinationComponent.selectAirport = this.airportService.airportItems.filter(airport => {
      const airportKeyValue = airport.city + ' ' + airport.key;
      return airportKeyValue !== this.departureValue
    });
  }

  onFormSubmit() {
    if (this.flightSearchForm.valid && this.isOneWayTrip) {
      const queryParams: ISearchFlight = {
        fromKey: this.departureValue.slice(-3, this.departureValue.length),
        toKey: this.destinationValue.slice(-3, this.destinationValue.length),
        forwardDate: new Date(this.dateOneWayValue).toISOString(),
        passengers: this.passengersValue,
      };
      if (queryParams) {
        this.router.navigate([RoutesPaths.BookingPageStep1], { queryParams });
      }
    } else if (this.flightSearchForm.valid && !this.isOneWayTrip) {
      const queryParams: ISearchFlight = {
        fromKey: this.departureValue.slice(-3, this.departureValue.length),
        toKey: this.destinationValue.slice(-3, this.destinationValue.length),
        forwardDate: new Date(this.dateRoundValue.start).toISOString(),
        backDate: new Date(this.dateRoundValue.end).toISOString(),
        passengers: this.passengersValue,
      };
      if (queryParams) {
        this.router.navigate([RoutesPaths.BookingPageStep1], { queryParams });
      }
    } else {
      this.flightSearchForm.markAllAsTouched();
    }
  }
}
