import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanLogInGuard implements CanActivate {


  constructor(
    private accountService: AccountService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.isAuthenticated().pipe(
      map(status => !status)
    );
  }

}
