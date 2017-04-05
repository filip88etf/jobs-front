import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './Profile/profile.component';
import { LoginModule } from '../Login/login.module';
import { SignupModule } from '../Signup/signup.module';
import { LoginComponent } from '../Login/login.component';
import { SignupComponent } from '../Signup/signup.component';
import { EditProfileComponent } from './Edit/edit-profile.component';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { SharedModule } from '../Shared/shared.module';
import { ResetPasswordComponent } from './ResetPassword/reset-password.component';
import { UserJobsComponent } from './Jobs/user-jobs.component';

export const userRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: UserComponent, children:
    [
      { path: '', component: ProfileComponent },
      { path: 'jobs', component: UserJobsComponent },
      { path: 'edit', component: EditProfileComponent },
      { path: 'password', component: ResetPasswordComponent }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(userRoutes), LoginModule, SignupModule,
    CommonModule, SharedModule ],
  declarations: [ EditProfileComponent, ResetPasswordComponent, ProfileComponent,
    UserComponent, UserJobsComponent ],
  providers: [ HttpModule, UserService ]
})

export class UserModule {}
