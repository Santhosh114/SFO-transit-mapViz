import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ToggleroutesComponent } from './toggleroutes/toggleroutes.component';
import { FetchroutesService } from './fetchroutes.service';

@NgModule({
  declarations: [
    ToggleroutesComponent
  ],
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    ToggleroutesComponent
  ],
  providers: [FetchroutesService]
})
export class MenuModule { }
