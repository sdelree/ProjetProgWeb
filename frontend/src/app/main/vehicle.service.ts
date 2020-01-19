import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from './vehicle.model';
import { environment } from '../../environments/environment';
import { retry } from 'rxjs/operators';

const url = `${environment.backendUrl}/vehicles`;
const numberOfTries = 2;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private http: HttpClient
  ) { }

  public getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(url).pipe(
      retry(numberOfTries)
    );
  }

  public addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(url, vehicle).pipe(
      retry(numberOfTries)
    );
  }

  public updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const vehicleUrl = `${url}/${vehicle.id}`;
    return this.http.put<Vehicle>(vehicleUrl, vehicle).pipe(
      retry(numberOfTries)
    );
  }

  public deleteVehicle(vehicle: Vehicle): Observable<void> {
    const vehicleUrl = `${url}/${vehicle.id}`;
    return this.http.delete<void>(vehicleUrl).pipe(
      retry(numberOfTries)
    );
  }
}
