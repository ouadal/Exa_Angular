import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMatiereComponentComponent } from './type-matiere-component.component';

describe('TypeMatiereComponentComponent', () => {
  let component: TypeMatiereComponentComponent;
  let fixture: ComponentFixture<TypeMatiereComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMatiereComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeMatiereComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
