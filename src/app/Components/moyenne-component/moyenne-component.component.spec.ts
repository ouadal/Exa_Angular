import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyenneComponentComponent } from './moyenne-component.component';

describe('MoyenneComponentComponent', () => {
  let component: MoyenneComponentComponent;
  let fixture: ComponentFixture<MoyenneComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyenneComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoyenneComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
