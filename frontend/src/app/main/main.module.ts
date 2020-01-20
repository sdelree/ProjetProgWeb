import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MapComponent } from './map/map.component';
import { MainComponent } from './main.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { VehicleSelectionComponent } from './vehicle-selection/vehicle-selection.component';
import { MatSelectModule } from '@angular/material/select';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule
} from '@angular/material';
import { ParkingDisplayComponent } from './parking-display/parking-display.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';


@NgModule({
  declarations: [ MapComponent, MainComponent, SearchBarComponent,
    VehicleSelectionComponent, ParkingDisplayComponent, VehicleFormComponent ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  entryComponents: [ VehicleFormComponent ]
})
export class MainModule { }
