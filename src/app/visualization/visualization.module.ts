import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map/map.component';
import { SetupMapsService } from './services/setup-maps.service';
import { InteractionService } from './services/user-interaction.service';
import { DrawRoutePathsService } from './services/draw-routepaths.service';


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
  providers: [
    SetupMapsService,
    InteractionService,
    DrawRoutePathsService
  ]
})
export class VisualizationModule { }
