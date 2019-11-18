import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MapComponent } from './map/map.component';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [MapComponent, MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
