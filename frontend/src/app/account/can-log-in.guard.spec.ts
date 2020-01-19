import { TestBed, inject } from '@angular/core/testing';

import { CanLogInGuard } from './can-log-in.guard';
import { AccountService } from './account.service';

describe('CanLogInGuard', () => {
  beforeEach(() => {
    const spyAccount = jasmine.createSpyObj('AccountService', ['isAuthenticated']);
    TestBed.configureTestingModule({
      providers: [
        CanLogInGuard,
        { provide: AccountService, useValue: spyAccount }
      ]
    });
  });

  it('should ...', inject([CanLogInGuard], (guard: CanLogInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
