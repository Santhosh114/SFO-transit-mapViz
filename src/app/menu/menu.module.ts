import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ToggleroutesComponent } from './toggleroutes/toggleroutes.component';
import { FetchroutesService } from './fetchroutes.service';

@NgModule({
  declarations: [
    ToggleroutesComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    NgbModule,
  ],
  exports: [
    ToggleroutesComponent
  ],
  providers: [FetchroutesService]
})
export class MenuModule { }
