import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { AirportService } from '../../services/airport/airport.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-departure-from',
  templateUrl: './departure-from.component.html',
  styleUrls: ['./departure-from.component.scss']
})
export class DepartureFromComponent implements OnInit, OnDestroy {
  selectAirport: ISelectAirport[] = [];

  searchAirport = '';

  selectDeparture = new FormControl('', [Validators.required]);

  @Output() departureValueChange = new EventEmitter<string>();

  subscriptions: Subscription[] = [];

  constructor(private airportService: AirportService){}

  ngOnInit() {
    this.subscriptions.push(
      this.airportService.airportsList$$.subscribe(data => this.selectAirport = data),
      this.airportService.searchItem.subscribe(
        (data) => (this.searchAirport = data))
    );
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

  onSelectDeparture(value: string) {
    this.departureValueChange.emit(value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe);
  }
}
