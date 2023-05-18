import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPassengersComponent } from './summary-passengers.component';

describe('SummaryPassengersComponent', () => {
  let component: SummaryPassengersComponent;
  let fixture: ComponentFixture<SummaryPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryPassengersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
