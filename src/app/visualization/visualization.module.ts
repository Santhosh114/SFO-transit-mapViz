import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map/map.component';
import { SetupMapsService } from './setup-maps.service';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MapComponent
  ],
  providers: [SetupMapsService]
})
export class VisualizationModule { }
