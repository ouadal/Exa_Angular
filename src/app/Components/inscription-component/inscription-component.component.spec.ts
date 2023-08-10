import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionComponentComponent } from './inscription-component.component';

describe('InscriptionComponentComponent', () => {
  let component: InscriptionComponentComponent;
  let fixture: ComponentFixture<InscriptionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
