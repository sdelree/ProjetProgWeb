import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AddressService } from './address.service';
import { ParkingService } from './parking.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let addressServiceSpy: jasmine.SpyObj<AddressService>;

  beforeEach(async(() => {
    const addrSpy = jasmine.createSpyObj('AddressService', ['getMatchingAddress', 'getAddress']);
    const parkingSpy = jasmine.createSpyObj('ParkingService', ['getBestParkings']);
    TestBed.configureTestingModule({
      declarations: [ MainComponent, VehicleSelectionStubComponent, MapStubComponent, SearchBarStubComponent ],
      imports: [ MatCardModule ],
      providers: [
        { provide: AddressService, useValue: addrSpy },
        { provide: ParkingService, useValue: parkingSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    addressServiceSpy = TestBed.get(AddressService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({selector: 'app-map', template: ''})
class MapStubComponent {
  @Input() markers;
}

@Component({selector: 'app-search-bar', template: ''})
class SearchBarStubComponent {
  @Input() autoCompleteAddresses;
}

@Component({selector: 'app-vehicle-selection', template: ''})
class VehicleSelectionStubComponent { }
