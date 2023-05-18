import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  AfterContentInit,
} from '@angular/core';
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
export class ShowFlightOptionsComponent
  implements OnInit, OnChanges, AfterContentInit
{
  @Input() flightData: IGotFlightData[] = [];
  @Input() isForward: boolean = true;
  @Output() isSelect = new EventEmitter<string>();
  detailedInfo!: IGotFlightData;
  departureCity: string = '';
  destinationCity: string = '';
  currencySign?: string;
  currencyLabel: string = '';
  visibleItems: IGotFlightData[] = [];
  currentPosition = 0;
  isSelected: boolean = false;
  selectedFlightsArray: IGotFlightData[] = [];
  disabled: boolean = true;
  constructor(
    private airportService: AirportService,
    private activatedRoute: ActivatedRoute,
    private headerService: HeaderService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    console.log(this.flightData);

    this.headerService.selectedValueCurrencyFormat$$.subscribe((res) => {
      this.currencySign = res.sign;
      this.currencyLabel = res.label;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['flightData']) {
      const currentFlightData = changes['flightData'].currentValue;
      let fromKey: string = '';
      let toKey: string = '';
      this.visibleItems = currentFlightData.slice(0, 5);
      this.detailedInfo = currentFlightData[2];
      this.airportService.getAirportsFromServer().subscribe((res) => {
        this.activatedRoute.queryParams.subscribe((params) => {
          fromKey = params['fromKey'];
          toKey = params['toKey'];
          this.departureCity = this.flightData[0].form.city;
          this.destinationCity = this.flightData[1].to.city;
          this.sharedService.getCities(
            this.destinationCity,
            this.departureCity
          );
        });
      });
    }
  }
  ngAfterContentInit() {
    // setTimeout(() => {
    //   this.isSelect.emit(this.detailedInfo.takeoffDate);
    // }, 0);
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
    // this.isSelect.emit(this.detailedInfo.takeoffDate);
  }

  getSelectedItemPrice(selectedFlight: IGotFlightData) {
    switch (this.currencyLabel) {
      case 'USD':
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

  selectFlight() {
    this.isSelected = true;
    this.isSelect.emit(this.detailedInfo.takeoffDate);
    if (this.isForward) {
      this.sharedService.passSelectedForwardFlight(this.detailedInfo);
    } else if (!this.isForward) {
      this.sharedService.passSelectedBackwardFlight(this.detailedInfo);
    }
  }
  editFlightSearch() {
    this.isSelected = false;
    this.isSelect.emit('');
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   if (this.isForward) {
    //     this.isSelect.emit(params['forwardDate'])
    //   }else if (!this.isForward) {
    //     this.isSelect.emit(params['backDate'])
    //   }
    // })
  }
}
