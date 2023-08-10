import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolementComponentComponent } from './enrolement-component.component';

describe('EnrolementComponentComponent', () => {
  let component: EnrolementComponentComponent;
  let fixture: ComponentFixture<EnrolementComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolementComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
