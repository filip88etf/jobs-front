import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [ RouterModule, FormsModule, CommonModule, SharedModule ],
  declarations: [LoginComponent, ResetPasswordComponent],
  exports: [LoginComponent]
})

export class LoginModule {}
