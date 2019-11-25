import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Address, AddressList} from './address.model';
import {Observable} from 'rxjs';
import {map, retry} from 'rxjs/operators';

const url = 'https://api-adresse.data.gouv.fr/search/';
const defaultParams = new HttpParams().set('lat', '44.836').set('lon', '-0.582');
const numberOfTries = 2;

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  getMatchingAddress(toMatch: string): Observable<Address[]> {
    const options = {
      params: defaultParams.set('q', toMatch)
    };
    return this.http.get<AddressList>(url, options).pipe(
      retry(numberOfTries),
      map(addressList => addressList.features)
    );
  }
}
