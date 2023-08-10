import { TestBed } from '@angular/core/testing';

import { CycleTypeExamenService } from './cycle-type-examen.service';

describe('CycleTypeExamenService', () => {
  let service: CycleTypeExamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CycleTypeExamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
