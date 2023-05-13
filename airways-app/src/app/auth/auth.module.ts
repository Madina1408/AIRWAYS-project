import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabDialogComponent } from './dialog/tab-dialog/tab-dialog.component';
import { SigninComponent } from './dialog/signin/signin.component';
import { SignupComponent } from './dialog/signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    TabDialogComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule
  ],
  exports: [
    TabDialogComponent,
    SigninComponent,
    SignupComponent,
  ],
})
export class AuthModule { }
