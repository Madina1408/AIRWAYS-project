import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatdialogService {

  dialogRef!: MatDialogRef<any, any>;

  constructor(private dialog: MatDialog) { }

  openDialog(component: ComponentType<any>): void {
    this.dialogRef = this.dialog.open(component, {
      width: '30.88rem',
      disableClose: true
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
