import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { VisualizationModule } from './visualization/visualization.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    VisualizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
