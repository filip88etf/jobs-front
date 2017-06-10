import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FacebookModule } from 'ngx-facebook';

import { SelectModule } from 'ng-select';
import { SharedModule } from '../Shared/shared.module';
import { SignupComponent } from './signup.component';
import { EmployerSignupComponent } from './Employer/employer-signup.component';
import { WorkerSignupComponent } from './Worker/worker-signup.component';
import { PickRoleComponent } from './PickRole/pick-role.component';
import { FacebookSignupComponent } from './FacebookSignup/facebook-signup.component';
import { FacebookEmployerComponent } from './FacebookSignup/Employer/facebook-employer.component';
import { FacebookWorkerComponent } from './FacebookSignup/Worker/facebook-worker.component';
import { FacebookRoleComponent } from './FacebookSignup/PickRole/facebook-role.component';

const signupRoutes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'signup/role', component: PickRoleComponent },
  { path: 'signup/worker', component: WorkerSignupComponent },
  { path: 'signup/employer', component: EmployerSignupComponent },
  { path: 'signup/facebook_role', component: FacebookRoleComponent },
  { path: 'signup/facebook_employer', component: FacebookEmployerComponent },
  { path: 'signup/facebook_worker', component: FacebookWorkerComponent }
];

@NgModule({
  imports: [HttpModule, RouterModule.forChild(signupRoutes), CommonModule, SelectModule,
            NgbModule, ReactiveFormsModule, SharedModule, FormsModule, FacebookModule.forRoot()],
  declarations: [SignupComponent, EmployerSignupComponent, WorkerSignupComponent, PickRoleComponent,
    FacebookEmployerComponent, FacebookWorkerComponent, FacebookRoleComponent, FacebookSignupComponent]
})

export class SignupModule {}
