import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AutocompletePlacesService } from './models/poi.model';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map-component/map-component.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
// import {NgxGooglePlacesAutocompleteModule} from "@codious/ngx-google-places-autocomplete";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponentComponent } from './info-component/info-component.component';

@NgModule({
  declarations: [AppComponent, MapComponent, InfoComponentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDE3SEIuN7skmbBHeElgl8zmhCw3C6pcSI',
      libraries: ['places'],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
