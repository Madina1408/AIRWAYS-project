import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {}

  openSuccessSnackBar(message: string){
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
     });
    }

    openFailureSnackBar(message: string){
    this._snackBar.open( message, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['failed-snackbar'],
      });
    }
}
