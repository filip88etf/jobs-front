import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(loginRoutes), FormsModule, CommonModule ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})

export class LoginModule {}
