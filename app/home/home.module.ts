import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, SelectModule,
    SharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule {}
