import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-vehicle-selection',
  templateUrl: './vehicle-selection.component.html',
  styleUrls: ['./vehicle-selection.component.css']
})
export class VehicleSelectionComponent implements OnInit, OnChanges {
  @Input() vehicles: Vehicle[];

  @Output() vehicleSelect: EventEmitter<Vehicle> = new EventEmitter();

  selected: Vehicle;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.vehicles && this.selected) {
      this.selected = this.vehicles.find(vehicle => vehicle._id === this.selected._id);
      this.onSelect();
    }
  }

  onSelect() {
    this.vehicleSelect.emit(this.selected);
  }

  ngForTrackFunction(index: number, vehicle: Vehicle) {
    return vehicle._id;
  }

}
