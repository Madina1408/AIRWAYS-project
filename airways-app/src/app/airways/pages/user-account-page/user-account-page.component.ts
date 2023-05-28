import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesPaths } from 'src/app/shared/models/enums/routes-paths';
import { WrappedCartItem } from 'src/app/airways/components/shopping-cart/shopping-cart.component';
import { UserService } from 'src/app/auth/services/user/user.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent implements OnInit {
  orderedItems: WrappedCartItem[][] | null = null;
  userId!: string;
  selecteCurrency!: string;
  anyTypedOrderedItems:any;
  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private headerService: HeaderService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.userId = this.userService.getCurrentUserId();
    this.orderedItems = this.localStorageService.getTypedStorageItem(
      this.userId + 'order'
    );
    this.headerService.selectedValueCurrencyFormat$$
      .asObservable()
      .subscribe((res) => {
        this.selecteCurrency != res.sign;
      });

      this.anyTypedOrderedItems=this.orderedItems;
  }

  goBackToSearch(){
    this.router.navigateByUrl(RoutesPaths.MainPage)
  }

  goToCart(){
    this.router.navigateByUrl(RoutesPaths.ShoppingCart)
  }

}
