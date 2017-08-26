import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XHRBackend, Request, XHRConnection, BrowserXhr, ResponseOptions, XSRFStrategy, Response} from '@angular/http';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from './core/services/service.module';

@NgModule({
  imports: [ BrowserModule, AppRoutingModule, SharedModule, HomeModule,
          ServiceModule.forRoot(), NgbModule.forRoot() ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
