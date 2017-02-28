import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../Shared/shared.module';
import { SignupComponent } from './signup.component';
import { ManualSignupComponent } from './Manual/manual-signup.component';

const signupRoutes: Routes = [
  { path: '', component : SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(signupRoutes), CommonModule, SelectModule,
            ReactiveFormsModule, SharedModule],
  declarations: [SignupComponent, ManualSignupComponent]
})

export class SignupModule {}
