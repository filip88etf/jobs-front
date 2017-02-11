import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})

export class LoginModule {}
