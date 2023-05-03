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
  selectAirport: ISelectAirport[] = this.airportService.airportItems;

  selectDestination = new FormControl('', [Validators.required]);

  @Output() destinationValueChange = new EventEmitter<string>();

  subscriptions: Subscription[] = [];

  constructor(private airportService: AirportService){}

  ngOnInit() {
    this.subscriptions.push(
      this.airportService.getAirports().subscribe(data => this.selectAirport = data)
    );
  }

  filterOptions(value: string) {
    if (!value) {
      this.selectAirport = this.airportService.airportItems;
    }

    this.selectAirport = this.selectAirport.filter(airport =>
      airport.city.toLowerCase().includes(value.toLowerCase()) &&
      airport.key.toLowerCase().includes(value.toLowerCase()));
    if (this.selectAirport.length > 0) {
      this.selectDestination.setErrors(null);
    } else {
      this.selectDestination.setErrors({ incorrect: true });
    }
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
