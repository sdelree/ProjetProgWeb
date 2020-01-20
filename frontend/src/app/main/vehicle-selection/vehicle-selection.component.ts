import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle } from "../vehicle.model";

@Component({
  selector: 'app-vehicle-selection',
  templateUrl: './vehicle-selection.component.html',
  styleUrls: ['./vehicle-selection.component.css']
})
export class VehicleSelectionComponent implements OnInit {
  @Input() vehicles: Vehicle[];

  @Output() vehicleSelect: EventEmitter<Vehicle> = new EventEmitter();

  selected: Vehicle;

  constructor() { }

  ngOnInit() {
  }

  onSelect() {
    console.log(this.selected);
    this.vehicleSelect.emit(this.selected);
  }

}
