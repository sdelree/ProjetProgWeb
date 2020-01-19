import { TestBed } from '@angular/core/testing';

import { ParkingService } from './parking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ParkingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: ParkingService = TestBed.get(ParkingService);
    expect(service).toBeTruthy();
  });
});
