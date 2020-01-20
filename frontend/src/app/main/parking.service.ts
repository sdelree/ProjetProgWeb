import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Parking } from './parking.model';
import { map, retry } from 'rxjs/operators';
import { Vehicle } from './vehicle.model';

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

  public getBestParkings(destination: [number, number], vehicle: Vehicle = null): Observable<Parking[]> {
    return this.getParkings().pipe(
      map(parkings => this.initScore(parkings)),
      map(parkings => this.distanceScore(parkings, destination)),
      map(parkings => this.priceScore(parkings)),
      map(parkings => this.freePlacesScore(parkings)),
      map(parkings => vehicle ? this.heightScore(parkings, vehicle) : parkings),
      map(parkings => vehicle ? this.electricScore(parkings, vehicle) : parkings),
      map(parkings => this.sortByScore(parkings)),
      map(parkings => parkings.map(parking => parking.parking))

    );
  }

  private initScore(parkings: Parking[]): ParkingWithScore[] {
    return parkings.map(parking => ({parking, score: 0}));
  }

  private distanceScore(parkings: ParkingWithScore[], destination: [number, number]): ParkingWithScore[] {
    const base = 1;
    return parkings.map(parking => {
      const coordinates = parking.parking.location;
      const distance = Math.sqrt(
        Math.pow(coordinates[0] - destination[0],2)
        +
        Math.pow(coordinates[1] - destination[1],2)
      );
      const score = Math.sqrt(base / distance);
      return {parking: parking.parking, score: parking.score + score};
    });
  }

  private sortByScore(parkings: ParkingWithScore[]): ParkingWithScore[] {
    parkings.sort(
      (parkingA, parkingB) => parkingA.score - parkingB.score
    );
    return parkings.slice(parkings.length - numberOfParkings, parkings.length).reverse();
  }

  private priceScore(parkings: ParkingWithScore[]): ParkingWithScore[] {
    const base = 1;
    const malus = -5;
    const coeff = 10;
    const max = 5;
    return parkings.map(parking => {
      const prices = parking.parking.prices;
      const totalHours = 44;
      const total = prices.oneHour + prices.twoHours + prices.threeHours + prices.fourHours + prices.tenHours + prices.twentyFourHours;
      const mean = total / totalHours;
      const score = isNaN(mean) ? malus : Math.min(base / mean * coeff, max);
      return {parking: parking.parking, score: parking.score + score};
    });
  }

  private freePlacesScore(parkings: ParkingWithScore[]): ParkingWithScore[] {
    const malus = -5;
    const coeff = 5;

    return parkings.map(parking => {
      const freePercentPlaces = parking.parking.freePlaces / parking.parking.places.total;
      const score = isNaN(freePercentPlaces) ? malus : coeff * freePercentPlaces;
      return {parking: parking.parking, score: parking.score + score};
    });

  }

  private heightScore(parkings: ParkingWithScore[], vehicle: Vehicle): ParkingWithScore[] {
    const bonus = 2;
    const malus = -Infinity;
    return parkings.map(parking => {
      if (!parking.parking.maxVehicleHeight) {
        return {parking: parking.parking, score: parking.score};
      } else if (parking.parking.maxVehicleHeight >= vehicle.height) {
        return {parking: parking.parking, score: parking.score + bonus};
      }
      return {parking: parking.parking, score: malus};
    });
  }

  private electricScore(parkings: ParkingWithScore[], vehicle: Vehicle): ParkingWithScore[] {
    const bonus = 2;
    return parkings.map(parking => {
      if (parking.parking.places.electric > 0 && vehicle.isElectric) {
        return  {parking: parking.parking, score: parking.score + bonus};
      }
      return {parking: parking.parking, score: parking.score};
    });
  }

}

interface ParkingWithScore {
  parking: Parking;
  score: number;
}
