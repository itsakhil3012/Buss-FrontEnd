import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSignupComponent } from './bus-signup.component';

describe('BusSignupComponent', () => {
  let component: BusSignupComponent;
  let fixture: ComponentFixture<BusSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
