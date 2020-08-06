import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AutocompletePlacesService } from './autocomplete-places.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map-component/map-component.component';

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [AutocompletePlacesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
