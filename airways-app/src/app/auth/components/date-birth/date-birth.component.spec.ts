import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateBirthComponent } from './date-birth.component';

describe('DateBirthComponent', () => {
  let component: DateBirthComponent;
  let fixture: ComponentFixture<DateBirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateBirthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
