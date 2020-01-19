import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Parking } from './parking.model';
import { map, retry } from 'rxjs/operators';

const url = `${environment.backendUrl}/parkings`;
const numberOfTries = 2;
const numberOfParkings = 4;

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

  public getBestParkings(destination: [number, number]): Observable<Parking[]> {
    return this.getParkings().pipe(
      map(parkings => this.initScore(parkings)),
      map(parkings => this.distanceScore(parkings, destination)),
      map(parkings => this.sortByScore(parkings)),
      map(parkings => parkings.map(parking => parking.parking))
    );
  }

  private initScore(parkings: Parking[]): ParkingWithScore[] {
    return parkings.map(parking => ({parking, score: 0}));
  }

  private distanceScore(parkings: ParkingWithScore[], destination: [number, number]): ParkingWithScore[] {
    return parkings.map(parking => {
      const coordinates = parking.parking.location;
      const distance = Math.sqrt(
        Math.pow(coordinates[0] - destination[0],2)
        +
        Math.pow(coordinates[1] - destination[1],2)
      );
      const score = 1000 / distance;
      return {parking: parking.parking, score: parking.score + score};
    });
  }

  private sortByScore(parkings: ParkingWithScore[]): ParkingWithScore[] {
    parkings.sort(
      (parkingA, parkingB) => parkingA.score - parkingB.score
    );
    return parkings.slice(parkings.length - numberOfParkings, parkings.length).reverse();
  }
}

interface ParkingWithScore {
  parking: Parking;
  score: number;
}
