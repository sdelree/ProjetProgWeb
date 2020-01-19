import { Component, OnInit } from '@angular/core';
import { AddressService } from './address.service';
import { Observable, Subject } from 'rxjs';
import { Address } from './address.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MapIconType, MapMarker } from './map/map.model';
import { ParkingService } from './parking.service';
import { Parking } from './parking.model';

const autoCompleteDebounceTime = 200;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  autoComplete$: Observable<Address[]>;
  mapMarkers: MapMarker[] = [];
  parkings: Parking[] = [];

  private autoCompleteRequested$: Subject<string> = new Subject();

  constructor(
    private addressService: AddressService,
    private parkingService: ParkingService
  ) { }

  ngOnInit() {
    this.autoComplete$ = this.autoCompleteRequested$.pipe(
      debounceTime(autoCompleteDebounceTime),
      distinctUntilChanged(),
      switchMap(toAutoComplete => this.addressService.getMatchingAddress(toAutoComplete))
    );
  }

  onSearch(value: string) {
    this.addressService.getAddress(value).subscribe(
      address => {
        this.mapMarkers = [{
          coordinates: address.geometry.coordinates,
          popupMessage: `Votre destination : ${address.properties.name}`,
          iconType: MapIconType.RED
        }];
        this.parkingService.getBestParkings(address.geometry.coordinates).subscribe(
          parkings => {
            const markers = parkings.map((parking, index) => ({
              coordinates: parking.location,
              popupMessage: `Parking ${index+1} : ${parking.name}`,
              iconType: MapIconType.BLUE
            }));
            this.mapMarkers = this.mapMarkers.concat(markers);
            this.parkings = parkings;
          });
      });
  }

  onAutoComplete(value: string) {
    if (value !== '') {
      this.autoCompleteRequested$.next(value);
    }
  }
}
