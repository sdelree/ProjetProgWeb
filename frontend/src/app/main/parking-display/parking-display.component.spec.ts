import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingDisplayComponent } from './parking-display.component';
import { MatExpansionModule } from '@angular/material';

describe('ParkingDisplayComponent', () => {
  let component: ParkingDisplayComponent;
  let fixture: ComponentFixture<ParkingDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingDisplayComponent ],
      imports: [ MatExpansionModule ]
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
