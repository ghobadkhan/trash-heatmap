import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GuardRoutingModule } from './routes/guard-routing.module';
import { AnonRoutingModule } from './routes/anon-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ReportLitterComponent } from './report-litter/report-litter.component';
import { LoginComponent } from './login/login.component';
import { TestSocketComponent } from './test-socket/test-socket.component';
import { JsonInterceptor } from './json.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ReportLitterComponent,
    LoginComponent,
    TestSocketComponent,
  ],
  imports: [
    BrowserModule,
    GuardRoutingModule,
    AnonRoutingModule,
    GoogleMapsModule,
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule
  ],
  exports: [
    MapComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
