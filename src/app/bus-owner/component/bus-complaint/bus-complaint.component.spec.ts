import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusComplaintComponent } from './bus-complaint.component';

describe('BusComplaintComponent', () => {
  let component: BusComplaintComponent;
  let fixture: ComponentFixture<BusComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusComplaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
