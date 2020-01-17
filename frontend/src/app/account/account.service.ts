import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, delay, map, startWith, switchMap, tap } from 'rxjs/operators';
import { UserInfo } from './account.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const emulatedDelay = 300;
const registerURL = `${environment.backendUrl}/users/register`;
const loginURL = `${environment.backendUrl}/users/login`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private authenticationToken ?: UserInfo = null;
  private authStatusChange$: Subject<void> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  public register(email: string, password: string): Observable<boolean> {
    return this.http.post(registerURL, {email, password}).pipe(
      map(_ => true),
      catchError(_ => of(false))
    );
  }

  public login(email: string, password: string): Observable<UserInfo> {
    return this.http.post<UserInfo>(loginURL, {email, password}).pipe(
      tap((authenticationToken) => this.authenticationToken = authenticationToken),
      tap(() => this.authStatusChange$.next())
    );
  }

  public logout(): Observable<boolean> {
    return of(true).pipe(
      delay(emulatedDelay),
      tap(() => this.authenticationToken = null),
      tap(() => this.authStatusChange$.next())
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authStatusChange$.pipe(
      startWith(this.authenticationToken),
      switchMap(() => of(!!this.authenticationToken))
    );
  }
}
