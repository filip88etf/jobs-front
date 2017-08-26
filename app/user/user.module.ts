import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileComponent } from './profile/profile.component';
import { LoginModule } from '../login/login.module';
import { SignupModule } from '../signup/signup.module';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { JobService } from '../jobs/job.service';
import { ServiceModule } from '../core/services/service.module';
import { ResetPasswordComponent } from '../login/reset-password.component';

export const userRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes), LoginModule,
    SignupModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, ServiceModule, NgbModule.forRoot()
  ],
  declarations: [
    ProfileComponent, UserComponent
  ],
  providers: [ HttpModule, JobService ]
})

export class UserModule {}
