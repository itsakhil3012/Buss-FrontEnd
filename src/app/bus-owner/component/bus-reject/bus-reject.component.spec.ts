import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRejectComponent } from './bus-reject.component';

describe('BusRejectComponent', () => {
  let component: BusRejectComponent;
  let fixture: ComponentFixture<BusRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
