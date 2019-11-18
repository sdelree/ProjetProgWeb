import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {LatLngTuple} from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private static readonly mapUrl: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  private static readonly bordeauxCoordinates: LatLngTuple = [44.836, -0.582];
  private map: L.Map = null;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.map = L.map('map').setView(MapComponent.bordeauxCoordinates, 12);
    L.tileLayer(MapComponent.mapUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

}
