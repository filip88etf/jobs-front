import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './Shared/shared.module';
import { HomeModule } from './Home/home.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from './service.module';

@NgModule({
  imports: [ BrowserModule, AppRoutingModule, SharedModule, HomeModule, ServiceModule.forRoot() ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
