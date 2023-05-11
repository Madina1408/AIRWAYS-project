import { TestBed } from '@angular/core/testing';

import { MatdialogService } from './matdialog.service';

describe('MatdialogService', () => {
  let service: MatdialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatdialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
