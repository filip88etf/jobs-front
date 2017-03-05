import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, SelectModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule {}
