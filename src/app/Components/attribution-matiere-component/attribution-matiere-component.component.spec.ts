import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionMatiereComponentComponent } from './attribution-matiere-component.component';

describe('AttributionMatiereComponentComponent', () => {
  let component: AttributionMatiereComponentComponent;
  let fixture: ComponentFixture<AttributionMatiereComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributionMatiereComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributionMatiereComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
