import { Component, OnInit } from '@angular/core';
import { FlightSearchDataService } from 'src/app/airways/services/flight-search-data/flight-search-data.service';
import { UserService } from 'src/app/auth/services/user/user.service';
import { IGotFlightData } from 'src/app/shared/models/interfaces/flight-data';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
type WrappedCartItem = {
  selected: boolean;
  cartData: IGotFlightData[];
};
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  userId?: string;

  passengers:string='';
  wrappedCartItems: WrappedCartItem[] | null = null;
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private flightSearchDataService: FlightSearchDataService,

  ) {}
  allComplete: boolean = false;

  ngOnInit(): void {
    this.flightSearchDataService.selectedValuePassengers$$.asObservable().subscribe(res=>{
      this.passengers=res
    })
    this.userId = this.userService.getCurrentUserId();
    this.wrappedCartItems = [];
    const cartItems: IGotFlightData[][] =
      this.localStorageService.getTypedStorageItem(this.userId);
    for (let cartItem of cartItems) {
      this.wrappedCartItems.push({ cartData: cartItem, selected: false });
    }
    console.log(this.userId);
  }
  updateAllComplete() {
    this.allComplete =
      this.wrappedCartItems != null &&
      this.wrappedCartItems.every((t) => t.selected);
  }

  someComplete(): boolean {
    if (this.wrappedCartItems == null) {
      return false;
    }
    return (
      this.wrappedCartItems.filter((t) => t.selected).length > 0 &&
      !this.allComplete
    );
  }

  setAll(selected: boolean) {
    this.allComplete = selected;
    if (this.wrappedCartItems == null) {
      return;
    }
    this.wrappedCartItems.forEach((t) => (t.selected = selected));
  }

}
