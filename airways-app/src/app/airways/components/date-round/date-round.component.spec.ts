import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRoundComponent } from './date-round.component';

describe('DateComponent', () => {
  let component: DateRoundComponent;
  let fixture: ComponentFixture<DateRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
