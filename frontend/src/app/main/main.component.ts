import { Component, OnInit } from '@angular/core';
import { AddressService } from './address.service';
import { Observable, Subject } from 'rxjs';
import { Address } from './address.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MapIconType, MapMarker } from './map/map.model';
import { ParkingService } from './parking.service';
import { Parking } from './parking.model';
import { AccountService } from '../account/account.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';

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
  vehicles$: Observable<Vehicle[]>

  private autoCompleteRequested$: Subject<string> = new Subject();

  constructor(
    private addressService: AddressService,
    private parkingService: ParkingService,
    private accountService: AccountService,
    private vehicleService: VehicleService,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.autoComplete$ = this.autoCompleteRequested$.pipe(
      debounceTime(autoCompleteDebounceTime),
      distinctUntilChanged(),
      switchMap(toAutoComplete => this.addressService.getMatchingAddress(toAutoComplete))
    );
    this.vehicles$ = this.vehicleService.getVehicles();
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
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

  openVehicleForm() {
    const formRef = this.matDialog.open(VehicleFormComponent, {});
    formRef.afterClosed().subscribe(vehicle => {
      if (vehicle !== undefined) {
        this.vehicleService.addVehicle(vehicle).subscribe(
          _ => this.matSnackBar.open('Votre véhicule a bien été ajouté'),
            _ => 'Il y a eu une erreur lors de l\'ajout de votre véhicule');
      }
    });
  }
}
