import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLngTuple, Marker } from 'leaflet';
import { MapMarker } from './map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() set markers(markers: MapMarker[]) {
    this.clearMarkers();
    if (markers) {
      for (const marker of markers) {
        this.addMarker(marker);
      }
    }
  }

  private static readonly mapUrl: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  private static readonly bordeauxCoordinates: LatLngTuple = [44.836, -0.582];
  private map: L.Map = null;
  private _markers: Marker[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(MapComponent.bordeauxCoordinates, 12);
    L.tileLayer(MapComponent.mapUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarker(marker: MapMarker): void {
    const layer = L.marker([marker.coordinates[1], marker.coordinates[0]])
      .addTo(this.map)
      .bindPopup(marker.popupMessage);
    this._markers.push(layer);
  }

  private clearMarkers(): void {
    for (const marker of this._markers) {
      marker.remove();
    }
    this._markers = [];
  }

}
