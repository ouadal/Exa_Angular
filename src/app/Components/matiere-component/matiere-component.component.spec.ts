import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereComponentComponent } from './matiere-component.component';

describe('MatiereComponentComponent', () => {
  let component: MatiereComponentComponent;
  let fixture: ComponentFixture<MatiereComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatiereComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatiereComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
