import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { UserComponent } from './user.component';
import { LoginModule } from '../Login/login.module';
import { SignupModule } from '../Signup/signup.module';
import { LoginComponent } from '../Login/login.component';
import { SignupComponent } from '../Signup/signup.component';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';

export const userRoutes: Routes = [
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(userRoutes), LoginModule, SignupModule,
    CommonModule ],
  declarations: [ UserComponent ],
  providers: [ HttpModule, UserService ]
})

export class UserModule {}
