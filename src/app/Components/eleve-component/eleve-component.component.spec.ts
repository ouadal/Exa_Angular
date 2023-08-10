import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveComponentComponent } from './eleve-component.component';

describe('EleveComponentComponent', () => {
  let component: EleveComponentComponent;
  let fixture: ComponentFixture<EleveComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleveComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleveComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
