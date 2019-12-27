import { TestBed } from '@angular/core/testing';

import { AddressService } from './address.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('AddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: AddressService = TestBed.get(AddressService);
    expect(service).toBeTruthy();
  });
});
