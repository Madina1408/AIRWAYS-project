import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './components/tab/tab.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    TabComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule
  ],
  exports: [
    TabComponent,
    SigninComponent,
    SignupComponent,
  ],
})
export class AuthModule { }
