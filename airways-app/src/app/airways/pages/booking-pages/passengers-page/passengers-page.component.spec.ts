import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersPageComponent } from './passengers-page.component';

describe('PassengersPageComponent', () => {
  let component: PassengersPageComponent;
  let fixture: ComponentFixture<PassengersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
