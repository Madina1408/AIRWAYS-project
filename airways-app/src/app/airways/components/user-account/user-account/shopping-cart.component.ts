import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightSearchDataService } from 'src/app/airways/services/flight-search-data/flight-search-data.service';
import { SharedService } from 'src/app/airways/services/shared/shared.service';
import { UserService } from 'src/app/auth/services/user/user.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
export type WrappedCartItem = {
  selected: boolean;
  cartData: IGotFlightData[];
};
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  userId: string = '';
  passengers: string = '';
  wrappedCartItems: WrappedCartItem[] | null = null;
  selectedItems: WrappedCartItem[] | null = null;
  cartItemsFromLocalStorage: IGotFlightData[][] | null = null;
  selectedItemCount: number = 0;
  selectedTotalPrice: number = 0;
  selecteCurrency!: string;
  constructor(
    private userService: UserService,
    private headerService: HeaderService,
    private localStorageService: LocalStorageService,
    private flightSearchDataService: FlightSearchDataService,
    private sharedService: SharedService,
    private notificationService:NotificationService,
    private router:Router,
  ) {}
  allComplete: boolean = false;

  ngOnInit(): void {
    this.headerService.selectedValueCurrencyFormat$$
      .asObservable()
      .subscribe((res) => {
        this.selecteCurrency != res.sign;
      });
    this.flightSearchDataService.selectedValuePassengers$$
      .asObservable()
      .subscribe((res) => {
        this.passengers = res;
      });
    this.userId = this.userService.getCurrentUserId();
    this.wrappedCartItems = [];
    this.cartItemsFromLocalStorage =
      this.localStorageService.getTypedStorageItem(this.userId);
    for (let cartItem of this.cartItemsFromLocalStorage) {
      this.wrappedCartItems.push({ cartData: cartItem, selected: false });
    }
    console.log(this.wrappedCartItems);

  }
  updateAllComplete() {
    this.allComplete =
      this.wrappedCartItems != null &&
      this.wrappedCartItems.every((t) => t.selected);
  }

  someComplete(): boolean {
    if (this.wrappedCartItems == null) {
      return false;
    } else {
      this.selectedTotalPrice = 0;
      this.selectedItemCount = 0;
      this.selectedItems = this.wrappedCartItems.filter((t) => t.selected);
      for (let i = 0; i < this.selectedItems!.length; i++) {
        this.selectedTotalPrice += +this.selectedItems![i].cartData[1];
        this.selectedItemCount += 1;
      }
      return (
        this.wrappedCartItems.filter((t) => t.selected).length > 0 &&
        !this.allComplete
      );
    }
  }

  setAll(selected: boolean) {
    this.allComplete = selected;
    if (this.wrappedCartItems == null) {
      return;
    }
    this.wrappedCartItems.forEach((t) => (t.selected = selected));

    if (this.allComplete) {
      for (let i = 0; i < this.wrappedCartItems!.length; i++) {
        this.selectedTotalPrice += +this.wrappedCartItems![i].cartData[1];
        this.selectedItemCount += 1;
      }
    } else {
      this.selectedTotalPrice = 0;
      this.selectedItemCount = 0;
    }
  }

  deleteItemFromCart(index: number) {
    this.cartItemsFromLocalStorage?.splice(index, 1);
    this.wrappedCartItems?.splice(index, 1);
    console.log(this.wrappedCartItems);
    this.localStorageService.setTypedStorageItem(
      this.userId,
      this.cartItemsFromLocalStorage!
    );
    this.sharedService.getAddToCardNumber(
      this.cartItemsFromLocalStorage!.length
    );
  }

  buyNow() {
    const selectedItems: IGotFlightData[][] = this.wrappedCartItems!.filter(
      (t) => t.selected
    ).map((t) => t.cartData);
    const unSelectedItems: IGotFlightData[][] = this.wrappedCartItems!.filter(
      (t) => !t.selected
    ).map((t) => t.cartData);
    this.wrappedCartItems = this.wrappedCartItems!.filter((t) => !t.selected);
    const existingOrder = this.localStorageService.getTypedStorageItem(
      this.userId + 'order'
    );
    this.localStorageService.setTypedStorageItem(this.userId, unSelectedItems);
    if (existingOrder === null) {
      this.localStorageService.setTypedStorageItem(
        this.userId + 'order',
        selectedItems
      );
    } else {
      existingOrder.push(...selectedItems);
      this.localStorageService.setTypedStorageItem(
        this.userId + 'order',
        existingOrder
      );
    }
    this.notificationService.openSuccessSnackBar('Thank you for your order! Purchase was successfull!');
    this.router.navigateByUrl(RoutesPaths.UserAccountPage);
  }
}
