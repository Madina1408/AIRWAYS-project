import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFlightPageComponent } from './select-flight-page.component';

describe('SelectFlightPageComponent', () => {
  let component: SelectFlightPageComponent;
  let fixture: ComponentFixture<SelectFlightPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFlightPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFlightPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
