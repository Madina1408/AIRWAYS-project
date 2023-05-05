import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ISelectPassengers } from 'src/app/shared/models/interfaces/select-passangers-interface';
import { FormControl, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { FlightSearchDataService } from '../../services/flight-search-data/flight-search-data.service';
import { Subscription } from 'rxjs';
import passengersList from '../../data/constants/passengers';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent {
  selectPassengers: ISelectPassengers[] = passengersList;
  selectedTypesPassengers = this.selectPassengers.filter(passenger => passenger.count > 0);
  selectedPassengersValue = this.selectedTypesPassengers
    .map(passenger => `${passenger.count} ${passenger.type}`).join(', ');

  selectListPassengers = new FormControl(this.selectedPassengersValue, Validators.required);

  @ViewChild(MatMenuTrigger, { static: true }) menuTrigger!: MatMenuTrigger;

  subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private flightSearch: FlightSearchDataService) {}

  getPassengersCount(): string {
    this.selectedPassengersValue = '';
    const selectedTypesPassengers = this.selectPassengers.filter(passenger => passenger.count > 0);
    selectedTypesPassengers.forEach((passenger, index) => {
      if (passenger.count > 0) {
        this.selectedPassengersValue += `${passenger.count} ${passenger.type}`;
        if (index < selectedTypesPassengers.length - 1) {
          this.selectedPassengersValue += ', ';
        }
      };
    });
    this.flightSearch.setSelectedValuePassengers(this.selectedPassengersValue);
    return this.selectedPassengersValue;
  }

  getMinCountPassangers(passenger: ISelectPassengers): number {
    if (passenger.type === 'Adults') {
      return 1;
    } else {
      return 0;
    }
  }

  increasePassengerCount(passenger: ISelectPassengers) {
    passenger.count++;
  }

  decreasePassengerCount(passenger: ISelectPassengers) {
    const minCount = this.getMinCountPassangers(passenger);
    if (passenger.count > minCount) {
      passenger.count--;
    }
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.menuTrigger?.menuOpen) {
      this.menuTrigger.closeMenu();
    }
  }
}
