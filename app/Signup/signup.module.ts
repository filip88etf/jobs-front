import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup.component';
import { ManualSignupComponent } from './Manual/manual-signup.component';

const signupRoutes: Routes = [
  { path: '', component : SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(signupRoutes)],
  declarations: [SignupComponent, ManualSignupComponent]
})

export class SignupModule {}
