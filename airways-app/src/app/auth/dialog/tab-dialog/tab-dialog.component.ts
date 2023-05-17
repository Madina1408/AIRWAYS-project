import { Component } from '@angular/core';


@Component({
  selector: 'app-tab-dialog',
  templateUrl: './tab-dialog.component.html',
  styleUrls: ['./tab-dialog.component.scss']
})
export class TabDialogComponent {
  selectedTabIndex = 0;

  changeTabIndex(index: number) {
    this.selectedTabIndex = index;
  }

}
