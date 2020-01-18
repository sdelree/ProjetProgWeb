import { TestBed } from '@angular/core/testing';

import { CorsInterceptorService } from './cors-interceptor.service';

describe('CorsInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorsInterceptorService = TestBed.get(CorsInterceptorService);
    expect(service).toBeTruthy();
  });
});
