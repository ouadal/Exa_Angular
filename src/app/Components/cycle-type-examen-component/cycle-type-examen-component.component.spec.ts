import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleTypeExamenComponentComponent } from './cycle-type-examen-component.component';

describe('CycleTypeExamenComponentComponent', () => {
  let component: CycleTypeExamenComponentComponent;
  let fixture: ComponentFixture<CycleTypeExamenComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleTypeExamenComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleTypeExamenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
