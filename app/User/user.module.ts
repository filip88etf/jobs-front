import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserJobModule } from './Jobs/user-job.module';
import { ProfileComponent } from './Profile/profile.component';
import { LoginModule } from '../Login/login.module';
import { SignupModule } from '../Signup/signup.module';
import { LoginComponent } from '../Login/login.component';
import { UserComponent } from './User/user.component';
import { SharedModule } from '../Shared/shared.module';
import { UserJobsComponent } from './Jobs/user-jobs.component';
import { JobService } from '../Jobs/job.service';
import { ServiceModule } from '../Core/Services/service.module';
import { ResetPasswordComponent } from '../Login/reset-password.component';

export const userRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
];

@NgModule({
  imports: [
    UserJobModule, RouterModule.forChild(userRoutes), LoginModule,
    SignupModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, ServiceModule, NgbModule.forRoot()
  ],
  declarations: [
    ProfileComponent, UserComponent
  ],
  exports: [ UserJobModule ],
  providers: [ HttpModule, JobService ]
})

export class UserModule {}
