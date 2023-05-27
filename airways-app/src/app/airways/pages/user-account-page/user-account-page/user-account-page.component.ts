import { Component, OnInit } from '@angular/core';
import { WrappedCartItem } from 'src/app/airways/components/user-account/user-account/user-account.component';
import { UserService } from 'src/app/auth/services/user/user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss']
})
export class UserAccountPageComponent implements OnInit {

  ordereditems: WrappedCartItem[][]|null=null;
  userId!:string
  constructor(private localStorageService: LocalStorageService, private userService:UserService){}
  ngOnInit(): void {
    this.userId = this.userService.getCurrentUserId();
    this.ordereditems= this.localStorageService.getTypedStorageItem(this.userId+'order');
    console.log(this.ordereditems);
  }
}
