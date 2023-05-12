import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatdialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(component: ComponentType<any>): Observable<boolean> {
    return this.dialog.open(component, {
      width: '30.875rem',
      panelClass: 'dialog',
      disableClose: true
    }).afterClosed();
  }
}
