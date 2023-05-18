import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IFormat } from '../../../shared/models/interfaces/format-interface';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutesPaths } from '../../../shared/models/enums/routes-paths';
import { HeaderService } from '../../services/header.service';
import { MatdialogService } from 'src/app/auth/services/matdialog/matdialog.service';
import { TabDialogComponent } from 'src/app/auth/dialog/tab-dialog/tab-dialog.component';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { UserService } from 'src/app/auth/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HeaderComponent implements OnInit, OnDestroy {
  dateOptions: IFormat[] = [];
  selectedDateFormat: string = '';

  currencyOptions: IFormat[] = [];
  selectedCurrencyFormat: string = '';
  isCurrencySelected = false;

  isShowBookFlights = false;
  isShowProgressBar = false;
  isMainPage = true;
  headerClass = '';

  subscriptions: Subscription[] = [];

  currentPageUrl = '';

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private dialogService: MatdialogService,
    public authService: AuthService,
    public userService: UserService
  ) {}

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
          this.currentPageUrl = event.url;

          switch (this.currentPageUrl.split('/')[1]) {
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

  onSelectDateFormat(option: IFormat) {
    this.selectedDateFormat = option.label;
    option.selected = true;

    this.dateOptions.forEach((item) => {
      if (item !== option) {
        item.selected = false;
      }
    });
    this.headerService.setSelectedValueDateFormat(option)
  }

  onSelectCurrencyFormat(option: IFormat) {
    this.selectedCurrencyFormat = option.label;
    this.isCurrencySelected = true;
    this.headerService.setSelectedValueCurrencyFormat(option);
  }

  openModalDialog(): void {
    this.dialogService.openDialog(TabDialogComponent);
  }

  onLogOut() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
