import { Component, OnInit } from '@angular/core';
import { FlightdataService } from '../../services/flightdata/flightdata.service';
import { ActivatedRoute } from '@angular/router';
import {IGotFlightDataList} from '../../../shared/models/interfaces/flight-data'
@Component({
  selector: 'app-show-flight-options',
  templateUrl: './show-flight-options.component.html',
  styleUrls: ['./show-flight-options.component.scss'],
})
export class ShowFlightOptionsComponent implements OnInit {
  flightData:IGotFlightDataList;
  constructor(private flightService: FlightdataService, private activatedRoute:ActivatedRoute) {
    this.flightData=this.activatedRoute.snapshot.data['flights'];
    console.log(this.flightData);
  }
  items: any[] = [
    { date: '01 Mar', price: '€146.70', weekday: 'Wednsday' },
    { date: '01 Mar', price: '€246.70', weekday: 'Friday' },
    { date: '01 Mar', price: '€146.70', weekday: 'Wednsday' },
    { date: '01 Mar', price: '€196.70', weekday: 'Wednsday' },
    { date: '01 Mar', price: '€46.70', weekday: 'Wednsday' },
    { date: '01 Mar', price: '€136.70', weekday: 'Wednsday' },
    { date: '01 Mar', price: '€346.70', weekday: 'SUnday' },
    { date: '01 Mar', price: '€86.70', weekday: 'Saturday' },
    { date: '01 Mar', price: '€46.70', weekday: 'Wednsday' },
  ];
  visibleItems: any[] = this.items.slice(0, 5);
  currentPosition = 0;

  ngOnInit(): void {

  }

  updateVisibleItems(): void {
    const startIndex = this.currentPosition;
    const endIndex = startIndex + 5;
    this.visibleItems = this.items.slice(startIndex, endIndex);
  }

  next(): void {
    if (this.currentPosition < this.items.length - 5) {
      this.currentPosition++;
      this.updateVisibleItems();
    }
  }

  prev(): void {
    if (this.currentPosition > 0) {
      this.currentPosition--;
      this.updateVisibleItems();
    }
    console.log('hello');
  }
}
