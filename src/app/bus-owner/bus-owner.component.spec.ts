import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusOwnerComponent } from './bus-owner.component';

describe('BusOwnerComponent', () => {
  let component: BusOwnerComponent;
  let fixture: ComponentFixture<BusOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
