import { TestBed } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('VehicleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: VehicleService = TestBed.get(VehicleService);
    expect(service).toBeTruthy();
  });
});
