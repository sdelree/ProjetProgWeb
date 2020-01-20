import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingDisplayComponent } from './parking-display.component';
import { MatExpansionModule, MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ParkingDisplayComponent', () => {
  let component: ParkingDisplayComponent;
  let fixture: ComponentFixture<ParkingDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingDisplayComponent ],
      imports: [ NoopAnimationsModule, MatExpansionModule, MatTabsModule ]
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
