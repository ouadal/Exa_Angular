import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenComponentComponent } from './examen-component.component';

describe('ExamenComponentComponent', () => {
  let component: ExamenComponentComponent;
  let fixture: ComponentFixture<ExamenComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
