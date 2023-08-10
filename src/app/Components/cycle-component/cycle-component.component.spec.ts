import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleComponentComponent } from './cycle-component.component';

describe('CycleComponentComponent', () => {
  let component: CycleComponentComponent;
  let fixture: ComponentFixture<CycleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
