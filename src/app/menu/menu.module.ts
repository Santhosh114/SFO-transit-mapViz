import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToggleroutesComponent } from './toggleroutes/toggleroutes.component';
import { FetchroutesService } from './services/fetchroutes.service';
import { InteractionService } from '../visualization/services/user-interaction.service';

@NgModule({
  declarations: [
    ToggleroutesComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ToggleroutesComponent
  ],
  providers: [FetchroutesService,
    InteractionService]
})
export class MenuModule { }
