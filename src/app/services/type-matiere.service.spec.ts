import { TestBed } from '@angular/core/testing';

import { TypeMatiereService } from './type-matiere.service';

describe('TypeMatiereService', () => {
  let service: TypeMatiereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMatiereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
