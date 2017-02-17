import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { ManualSignupComponent } from './Manual/manual-signup.component';

const signupRoutes: Routes = [
  { path: '', component : SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(signupRoutes), CommonModule, SelectModule],
  declarations: [SignupComponent, ManualSignupComponent, ReactiveFormsModule]
})

export class SignupModule {}
