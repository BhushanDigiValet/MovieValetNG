import { TestBed } from '@angular/core/testing';

import { SeatSelectionService } from './seat-selection.service';

describe('SeatSelectionService', () => {
  let service: SeatSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
