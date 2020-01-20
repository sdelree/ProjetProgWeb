import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, Observable, Subject } from 'rxjs';
import { Vehicle } from './vehicle.model';
import { environment } from '../../environments/environment';
import { map, retry, shareReplay, take, tap } from 'rxjs/operators';

const url = `${environment.backendUrl}/vehicles`;
const numberOfTries = 2;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private cache$: Observable<Vehicle[]>;
  private updates$: Subject<Vehicle[]> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  public getVehicles(): Observable<Vehicle[]> {
    if (!this.cache$) {
      this.cache$ = this.http.get<Vehicle[]>(url)
        .pipe(
          shareReplay(1)
        );
      this.cache$ = concat(this.cache$, this.updates$).pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  public addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(url, vehicle).pipe(
      retry(numberOfTries),
      tap(newVehicle => this.updateInCache(newVehicle))
    );
  }

  public updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const vehicleUrl = `${url}/${vehicle._id}`;
    return this.http.put<Vehicle>(vehicleUrl, vehicle).pipe(
      retry(numberOfTries),
      tap(updatedVehicle => this.updateInCache(updatedVehicle))
    );
  }

  public deleteVehicle(vehicle: Vehicle): Observable<void> {
    const vehicleUrl = `${url}/${vehicle._id}`;
    return this.http.delete<void>(vehicleUrl).pipe(
      retry(numberOfTries),
      tap(() => this.deleteFromCache(vehicle._id))
    );
  }

  protected updateInCache(toUpdate: Vehicle): void {
    let isPresent = false;
    this.getVehicles().pipe(
      take(1),
      map(vehicles => vehicles.map(it => it._id === toUpdate._id ? (isPresent = true) && toUpdate : it)),
      map(items => isPresent ? items : items.concat([toUpdate])),
      tap(items => this.updates$.next(items))
    ).subscribe();
  }

  protected deleteFromCache(id: string): void {
    this.getVehicles().pipe(
      take(1),
      map(vehicles => vehicles.filter(vehicle => vehicle._id !== id)),
      tap(vehicles => this.updates$.next(vehicles))
    ).subscribe();
  }
}
