import { TestBed } from '@angular/core/testing';

import { TypeExamenService } from './type-examen.service';

describe('TypeExamenService', () => {
  let service: TypeExamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeExamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
