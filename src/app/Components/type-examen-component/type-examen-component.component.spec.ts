import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeExamenComponentComponent } from './type-examen-component.component';

describe('TypeExamenComponentComponent', () => {
  let component: TypeExamenComponentComponent;
  let fixture: ComponentFixture<TypeExamenComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeExamenComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeExamenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
