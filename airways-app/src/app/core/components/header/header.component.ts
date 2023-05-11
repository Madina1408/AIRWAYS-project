import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ISelectFormat } from '../../../shared/models/interfaces/select-format-interface';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutesPaths } from '../../../shared/models/enums/routes-paths';
import { HeaderService } from '../../services/header.service';
import { MatdialogService } from 'src/app/auth/services/matdialog/matdialog.service';
import { TabComponent } from 'src/app/auth/components/tab/tab.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HeaderComponent implements OnInit, OnDestroy {
  dateOptions: ISelectFormat[] = [];
  selectedDateFormat: string = '';

  currencyOptions: ISelectFormat[] = [];
  selectedCurrencyFormat: string = '';
  isCurrencySelected = false;

  isShowBookFlights = false;
  isShowProgressBar = false;
  isMainPage = true;
  headerClass = '';

  subscriptions: Subscription[] = [];

  @Output() emitConfirm: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private headerService: HeaderService, private dialogService: MatdialogService) {}

  ngOnInit(): void {
    this.dateOptions = this.headerService.dateFormats;
    this.currencyOptions = this.headerService.currancyFormats;

    this.subscriptions.push(
      this.headerService.selectedValueDateFormat$$.subscribe(data => {
        this.selectedDateFormat = data.label;
      }),
      this.headerService.selectedValueCurrencyFormat$$.subscribe(currancy => {
        this.selectedCurrencyFormat = currancy.label;
      }),
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const currentUrl = event.url;

          switch (currentUrl.split('/')[1]) {
            case RoutesPaths.MainPage:
              this.isShowBookFlights = true;
              this.isShowProgressBar = false;
              this.isMainPage = true;
              this.headerClass = RoutesPaths.MainPage;
              break;
            case RoutesPaths.BookingPage:
              this.isShowBookFlights = false;
              this.isShowProgressBar = true;
              this.isMainPage = false;
              this.headerClass = RoutesPaths.BookingPage;
              break;
            case RoutesPaths.ShoppingCart:
              this.isShowBookFlights = false;
              this.isShowProgressBar = true;
              this.isMainPage = false;
              this.headerClass = RoutesPaths.ShoppingCart;
              break;
            default:
            this.isShowBookFlights = true;
            this.isShowProgressBar = false;
            this.isMainPage = true;
            this.headerClass = RoutesPaths.MainPage;
          }
        }
      })
    );
  }

  onSelectDateFormat(option: ISelectFormat) {
    this.selectedDateFormat = option.label;
    option.selected = true;

    this.dateOptions.forEach((item) => {
      if (item !== option) {
        item.selected = false;
      }
    });
    this.headerService.setSelectedValueDateFormat(option)
  }

  onSelectCurrencyFormat(option: ISelectFormat) {
    this.selectedCurrencyFormat = option.label;
    this.isCurrencySelected = true;
    this.headerService.setSelectedValueCurrencyFormat(option);
  }

  openModalDialog(): void {
    this.dialogService.openDialog(TabComponent).subscribe((result) => {
      this.emitConfirm.emit(result);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
