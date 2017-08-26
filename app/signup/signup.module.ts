import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FacebookModule } from 'ngx-facebook';

import { SelectModule } from 'ng-select';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup.component';
import { EmployerSignupComponent } from './employer/employer-signup.component';
import { WorkerSignupComponent } from './worker/worker-signup.component';
import { PickRoleComponent } from './pick-role/pick-role.component';
import { FacebookSignupComponent } from './facebook-signup/facebook-signup.component';
import { FacebookEmployerComponent } from './facebook-signup/employer/facebook-employer.component';
import { FacebookWorkerComponent } from './facebook-signup/worker/facebook-worker.component';
import { FacebookRoleComponent } from './facebook-signup/pick-role/facebook-role.component';

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
