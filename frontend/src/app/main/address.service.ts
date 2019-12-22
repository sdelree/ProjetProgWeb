import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Address, AddressList } from './address.model';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

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
      map(addressList => addressList.features),
      map(addressList => addressList.map(address => this.adaptAddressData(address)))
    );
  }

  getAddress(name: string): Observable<Address> {
    const options = {
      params: defaultParams.set('q', name).set('limit', '1')
    };
    return this.http.get<AddressList>(url, options).pipe(
      retry(numberOfTries),
      map(addressList => addressList.features.length === 1 ? addressList.features[0] : null),
      map(address => this.adaptAddressData(address))
    );
  }

  /**
   * Inverts received coordinates from cartesian (x,y) to geographical (lat,lng).
   */
  private mapCoordinatesToLatLng(coordinates: [number, number]): [number, number] {
    return [coordinates[1], coordinates[0]];
  }

  /**
   * Apply modifications on received addresses to make it usable by the rest of the app.
   */
  private adaptAddressData(address: Address): Address {
    return {
      ...address,
      geometry:
        {...address.geometry,
          coordinates:
            this.mapCoordinatesToLatLng(address.geometry.coordinates)
        }
    };
  }
}
