import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  imports: [ RouterModule, FormsModule, CommonModule, SharedModule ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})

export class LoginModule {}
