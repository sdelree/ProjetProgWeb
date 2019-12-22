import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Parking } from "./parking.model";
import { retry } from "rxjs/operators";

const url = `${environment.backendUrl}/parkings`;
const numberOfTries = 2;

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(
    private http: HttpClient
  ) { }

  public getParkings(): Observable<Parking[]> {
    return this.http.get<Parking[]>(url).pipe(
      retry(numberOfTries)
    );
  }
}
