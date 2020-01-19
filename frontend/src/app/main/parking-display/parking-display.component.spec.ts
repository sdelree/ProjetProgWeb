import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingDisplayComponent } from './parking-display.component';

describe('ParkingDisplayComponent', () => {
  let component: ParkingDisplayComponent;
  let fixture: ComponentFixture<ParkingDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
