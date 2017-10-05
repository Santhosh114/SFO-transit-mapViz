import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map/map.component';
import { SetupMapsService } from './services/setup-maps.service';
import { ManageRoutesService } from './services/manage-routes.service';
import { FetchRoutePathsService } from './services/fetch-routepaths.service';


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
    ManageRoutesService,
    FetchRoutePathsService
  ]
})
export class VisualizationModule { }
