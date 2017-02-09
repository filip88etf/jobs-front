import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule {}
