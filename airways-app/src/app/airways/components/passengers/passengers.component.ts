import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { ISelectPassengers } from 'src/app/shared/models/interfaces/select-passangers-interface';
import passengersList from '../../data/constants/passengers';
import { FormControl, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent {
  selectPassengers: ISelectPassengers[] = passengersList;
  defaultValue: string = `${this.selectPassengers[0].count} ${this.selectPassengers[0].type}`;

  selectListPassengers = new FormControl(this.defaultValue, Validators.required);

  @ViewChild(MatMenuTrigger, { static: true }) menuTrigger!: MatMenuTrigger;

  @Output() passengersValueChange = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {}

  getPassengersCount(): string {
    this.defaultValue = '';
    const selectedTypesPassengers = this.selectPassengers.filter(passenger => passenger.count > 0);
    selectedTypesPassengers.forEach((passenger, index) => {
      if (passenger.count > 0) {
        this.defaultValue += `${passenger.count} ${passenger.type}`;
        if (index < selectedTypesPassengers.length - 1) {
          this.defaultValue += ', ';
        }
      };
    });
    this.passengersValueChange.emit(this.defaultValue);
    return this.defaultValue;
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
