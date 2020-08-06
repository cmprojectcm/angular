import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AutocompletePlacesService } from './autocomplete-places.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map-component/map-component.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDE3SEIuN7skmbBHeElgl8zmhCw3C6pcSI",
      libraries: ['places']
  })],
  providers: [AutocompletePlacesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
