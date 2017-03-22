import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { ProfileComponent } from '../User/profile.component';
import { SharedModule } from '../Shared/shared.module';

const loginRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(loginRoutes), FormsModule, CommonModule, SharedModule ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})

export class LoginModule {}
