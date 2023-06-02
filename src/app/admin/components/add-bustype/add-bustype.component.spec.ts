import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBustypeComponent } from './add-bustype.component';

describe('AddBustypeComponent', () => {
  let component: AddBustypeComponent;
  let fixture: ComponentFixture<AddBustypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBustypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBustypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
