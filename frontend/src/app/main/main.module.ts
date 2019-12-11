import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MapComponent } from './map/map.component';
import { MainComponent } from './main.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { VehicleSelectionComponent } from './vehicle-selection/vehicle-selection.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material';


@NgModule({
  declarations: [MapComponent, MainComponent, SearchBarComponent, VehicleSelectionComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class MainModule { }
