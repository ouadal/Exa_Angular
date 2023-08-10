import { TestBed } from '@angular/core/testing';

import { AttributionMatiereService } from './attribution-matiere.service';

describe('AttributionMatiereService', () => {
  let service: AttributionMatiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributionMatiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
