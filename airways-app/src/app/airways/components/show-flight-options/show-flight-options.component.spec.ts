import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFlightOptionsComponent } from './show-flight-options.component';

describe('ShowFlightOptionsComponent', () => {
  let component: ShowFlightOptionsComponent;
  let fixture: ComponentFixture<ShowFlightOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFlightOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFlightOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
