import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './components/tab/tab.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';



@NgModule({
  declarations: [
    TabComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
