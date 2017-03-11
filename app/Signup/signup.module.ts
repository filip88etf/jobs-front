import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { SelectModule } from 'ng2-select';
import { SharedModule } from '../Shared/shared.module';
import { SignupComponent } from './signup.component';
import { ManualSignupComponent } from './Manual/manual-signup.component';

const signupRoutes: Routes = [
  { path: '', component : SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(signupRoutes), CommonModule, SelectModule,
            MyDatePickerModule, ReactiveFormsModule, SharedModule, FormsModule],
  declarations: [SignupComponent, ManualSignupComponent]
})

export class SignupModule {}
