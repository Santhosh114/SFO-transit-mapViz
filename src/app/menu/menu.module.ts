import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ToggleroutesComponent } from './toggleroutes/toggleroutes.component';
import { FetchroutesService } from './fetchroutes.service';

@NgModule({
  declarations: [
    ToggleroutesComponent,
    // FetchroutesService
  ],
  imports: [
    CommonModule,
    HttpModule,
    NgbModule,
  ],
  exports: [
    ToggleroutesComponent,
    // FetchroutesService
  ],
  providers: [FetchroutesService]
})
export class MenuModule { }
