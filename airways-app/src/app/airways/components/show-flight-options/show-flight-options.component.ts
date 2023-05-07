import { Component, OnInit, Input } from '@angular/core';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { AirportService } from '../../services/airport/airport.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';
import { SharedService } from '../../services/shared/shared.service';
import { IPostFlightData } from 'src/app/shared/models/interfaces/post-flight-interface';
@Component({
  selector: 'app-show-flight-options',
  templateUrl: './show-flight-options.component.html',
  styleUrls: ['./show-flight-options.component.scss'],
})
export class ShowFlightOptionsComponent implements OnInit {
  @Input() flightData: IGotFlightData[] = [];
  @Input() isForward: boolean = true;
  detailedInfo!: IGotFlightData;
  departureCity: string = '';
  destinationCity: string = '';
  currencySign?: string;
  currencyLabel: string = '';
  visibleItems: IGotFlightData[] = [];
  currentPosition = 0;
  constructor(
    private airportService: AirportService,
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.headerService.selectedValueCurrencyFormat$$.subscribe((res) => {
      this.currencySign = res.sign;
      this.currencyLabel = res.label;
    });
    let fromKey: string = '';
    let toKey: string = '';
    this.visibleItems = this.flightData.slice(0, 5);
    this.detailedInfo = this.flightData[2];
    this.airportService.getAirportsFromServer().subscribe((res) => {
      this.activatedRoute.queryParams.subscribe((params) => {
        fromKey = params['fromKey'];
        toKey = params['toKey'];
        this.departureCity=this.flightData[0].form.city;
        this.destinationCity=this.flightData[1].to.city;
        this.sharedService.getCities(this.destinationCity,this.departureCity);
      });
    });
  }

  updateVisibleItems(): void {
    const startIndex = this.currentPosition;
    const endIndex = startIndex + 5;
    this.visibleItems = this.flightData.slice(startIndex, endIndex);
  }

  next(): void {
    if (this.currentPosition < this.flightData.length - 5) {
      this.currentPosition++;
      this.updateVisibleItems();
    }
  }

  prev(): void {
    if (this.currentPosition > 0) {
      this.currentPosition--;
      this.updateVisibleItems();
    }
  }

  showDetailedFlightInfo(flightNumber: string) {
    const flightArray = this.flightData.filter(
      (flight) => flight.flightNumber == flightNumber
    );
    this.detailedInfo = flightArray[0];
  }

  getSelectedItemPrice(selectedFlight: IGotFlightData) {
    switch (this.currencyLabel) {
      case 'USA':
        return selectedFlight.price.usd;
      case 'EUR':
        return selectedFlight.price.eur;
      case 'RUB':
        return selectedFlight.price.rub;
      case 'PLN':
        return selectedFlight.price.pln;
    }
    return 0;
  }
}
