import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlightSearchComponent } from './edit-flight-search.component';

describe('EditFlightSearchComponent', () => {
  let component: EditFlightSearchComponent;
  let fixture: ComponentFixture<EditFlightSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFlightSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
