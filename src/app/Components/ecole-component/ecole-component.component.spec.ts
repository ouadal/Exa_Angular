import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleComponentComponent } from './ecole-component.component';

describe('EcoleComponentComponent', () => {
  let component: EcoleComponentComponent;
  let fixture: ComponentFixture<EcoleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcoleComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcoleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
