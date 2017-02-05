import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './Login/login.component';

const routes: Routes = [
  { path: '', component : HomeComponent},
  { path: 'login', component : LoginComponent }
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
