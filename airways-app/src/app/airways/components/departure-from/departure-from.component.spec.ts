import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureFromComponent } from './departure-from.component';

describe('DepartureFromComponent', () => {
  let component: DepartureFromComponent;
  let fixture: ComponentFixture<DepartureFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
