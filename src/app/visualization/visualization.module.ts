import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastyModule} from 'ng2-toasty';
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
    ToastyModule.forRoot()
  ],
  exports: [
    MapComponent,
    ToastyModule
  ],
  providers: [
    SetupMapsService,
    InteractionService,
    DrawRoutePathsService
  ]
})
export class VisualizationModule { }
