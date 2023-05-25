import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IPassenger } from 'src/app/shared/models/interfaces/passengers-interface';
import { FormControl, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';
import { Subscription, take } from 'rxjs';
import passengersList from '../../../shared/models/constants/passengers';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger, { static: true }) menuTrigger!: MatMenuTrigger;
  @Output() passengersValueChange = new EventEmitter<string>();

  selectPassengers: IPassenger[] = passengersList;

  selectedTypesPassengers: IPassenger[] = [];

  selectedPassengersValue = '';

  passengersControl = new FormControl(this.selectedPassengersValue, Validators.required);

  subscriptions: Subscription[] = [];



  constructor(
    private elementRef: ElementRef,
    private flightSearch: FlightSearchDataService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.passengersControl.valueChanges.pipe(take(1)).subscribe(value => {
        this.passengersValueChange.emit(value!);
      })
    );
  }

  getPassengersCount(): string {
    this.selectedTypesPassengers = this.selectPassengers.filter(passenger => passenger.count > 0);

    this.selectedPassengersValue = this.selectedTypesPassengers
      .map(passenger => `${passenger.count} ${passenger.type}`).join(', ');

    this.flightSearch.setSelectedValuePassengers(this.selectedPassengersValue);
    this.passengersControl.setValue(this.selectedPassengersValue);
    return this.selectedPassengersValue;
  }

  getMinCountPassengers(passenger: IPassenger): number {
    return passenger.type === 'Adult' ? 1 : 0;
  }

  increasePassengerCount(passenger: IPassenger): void {
    passenger.count++;
    this.emitPassengersValue();
  }

  decreasePassengerCount(passenger: IPassenger): void {
    const minCount = this.getMinCountPassengers(passenger);
    if (passenger.count > minCount) {
      passenger.count--;
      this.emitPassengersValue();
    }
  }

  private emitPassengersValue(): void {
    this.selectedPassengersValue = this.getPassengersCount();
    this.passengersControl.setValue(this.selectedPassengersValue);
    this.passengersValueChange.emit(this.selectedPassengersValue);
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.menuTrigger?.menuOpen) {
      this.menuTrigger.closeMenu();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
