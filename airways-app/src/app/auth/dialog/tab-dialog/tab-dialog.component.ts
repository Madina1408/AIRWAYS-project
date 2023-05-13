import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-dialog',
  templateUrl: './tab-dialog.component.html',
  styleUrls: ['./tab-dialog.component.scss']
})
export class TabDialogComponent implements OnInit, OnDestroy {
  index = 0;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((parameter: Params) => {
      if (parameter['tab'] === 'Sign In') {
        this.index = 0;
      } else if (parameter['tab'] === 'Sign Up') {
        this.index = 1;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
