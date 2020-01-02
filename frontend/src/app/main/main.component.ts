import { Component, OnInit } from '@angular/core';
import { AddressService } from './address.service';
import { Observable, Subject } from 'rxjs';
import { Address } from './address.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MapIconType, MapMarker } from './map/map.model';

const autoCompleteDebounceTime = 200;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  autoComplete$: Observable<Address[]>;
  mapMarkers: MapMarker[] = [];

  private autoCompleteRequested$: Subject<string> = new Subject();

  constructor(
    private addressService: AddressService
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
      address => this.mapMarkers = this.mapMarkers.concat([{
        coordinates: address.geometry.coordinates,
        popupMessage: `Votre destination : ${address.properties.name}`,
        iconType: MapIconType.GREEN
      }])
    );
  }

  onAutoComplete(value: string) {
    if (value !== '') {
      this.autoCompleteRequested$.next(value);
    }
  }
}
