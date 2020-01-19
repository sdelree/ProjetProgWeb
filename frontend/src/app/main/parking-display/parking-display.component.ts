import { Component, Input, OnInit } from '@angular/core';
import { Parking } from '../parking.model';

@Component({
  selector: 'app-parking-display',
  templateUrl: './parking-display.component.html',
  styleUrls: ['./parking-display.component.css']
})
export class ParkingDisplayComponent implements OnInit {

  @Input() parkings: Parking[];

  constructor() { }

  ngOnInit() {
  }

}
