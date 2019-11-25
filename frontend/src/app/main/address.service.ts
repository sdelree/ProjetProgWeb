import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Address, AddressList} from './address.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const url = 'https://api-adresse.data.gouv.fr/search/';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  getMatchingAddress(toMatch: string): Observable<Address[]> {
    const options = {
      params: new HttpParams().set('q', toMatch)
    };
    return this.http.get<AddressList>(url, options).pipe(
      map(addressList => addressList.features)
    );
  }
}
