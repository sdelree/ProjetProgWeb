import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLngTuple, Marker } from 'leaflet';
import { MapIconType, MapMarker } from './map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() set markers(markers: MapMarker[]) {
    this.clearMarkers();
    if (markers && markers.length > 0) {
      for (const marker of markers) {
        this.addMarker(marker);
      }
      const markerLocations = markers.map(marker => marker.coordinates);
      this.centerOn(markerLocations);
    }
  }

  private static readonly mapUrl: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  private static readonly bordeauxCoordinates: LatLngTuple = [44.836, -0.582];
  private map: L.Map = null;
  private _markers: Marker[] = [];

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(MapComponent.bordeauxCoordinates, 12);
    L.tileLayer(MapComponent.mapUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarker(marker: MapMarker): void {
    const layer = L.marker(marker.coordinates, {icon: MapIcons.get(marker.iconType)})
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

  private centerOn(locations: [number, number][]): void {
    this.map.fitBounds(locations, {animate: true, duration: 1000, maxZoom: 14});
  }
}

const MapIcons = new Map()
  .set(MapIconType.GREEN, buildIcon(['marker-green']))
  .set(MapIconType.BLUE, buildIcon(['marker-blue']))
  .set(MapIconType.RED, buildIcon(['marker-red']))
  .set(MapIconType.DEFAULT, buildIcon([]));

function buildIcon(classNames: string[]): L.DivIcon {
  return L.divIcon({
    html: `<span class="marker ${classNames.join(' ')}"></span>`,
    popupAnchor: [0, -24]
  });
}
