import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ISelectAirport } from 'src/app/shared/models/interfaces/select-airport-interface';
import { AirportService } from '../../services/airport/airport.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit, OnDestroy {
  selectAirport: ISelectAirport[] = [];

  searchAirport = '';

  selectDestination = new FormControl('', [Validators.required]);

  @Output() destinationValueChange = new EventEmitter<string>();

  subscriptions: Subscription[] = [];

  constructor(private airportService: AirportService){}

  ngOnInit() {
    this.subscriptions.push(
      this.airportService.airportsList$$.subscribe(data => this.selectAirport = data)
    );
  }

  filterOptions(value: string) {
    this.airportService.searchItem.next(value);
  }

  getDestinationErrorMessage() {
    if (this.selectDestination.hasError('required')) {
      return 'Please select destination';
    } else if (this.selectDestination.hasError('incorrect')) {
      return 'No airports found';
    }
    return '';
  }

  onSelectDestination(value: string) {
    this.destinationValueChange.emit(value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe);
  }
}
