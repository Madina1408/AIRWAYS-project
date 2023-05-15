import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatdialogService {

  constructor(private dialog: MatDialog, private overlay: Overlay) { }

  openDialog(component: ComponentType<any>): Observable<boolean> {
    return this.dialog.open(component, {
      width: '30.88rem',
      disableClose: true
    }).afterClosed();
  }
}
