import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EmployerDetailsComponent } from './details/employer-details.component';
import { SharedModule } from '../shared/shared.module';
import { EmployerJobModule } from './my-jobs/employer-job.module';
import { UserModule } from '../user/user.module';
import { UserComponent } from '../user/user/user.component';
import { EditEmployerComponent } from './edit/edit-employer.component';
import { EmployerJobsComponent } from './my-jobs/list/employer-jobs.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { EmployerJobDetailsComponent } from './my-jobs/details/employer-job-details.component';

export const employerRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  { path: 'jobs', canActivate: [AuthGuardService], component: EmployerJobsComponent },
  { path: 'job', canActivate: [AuthGuardService], component: EmployerJobDetailsComponent },
  { path: 'details', component: EmployerDetailsComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: UserComponent, children:
    [
      { path: '', canActivate: [AuthGuardService], component: ProfileComponent },
      { path: 'edit', canActivate: [AuthGuardService], component: EditEmployerComponent },
    ]
  }
  ];

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, SharedModule,
    RouterModule.forChild(employerRoutes), UserModule, EmployerJobModule ],
  declarations: [ EditEmployerComponent, EmployerDetailsComponent ],
  exports: [ EditEmployerComponent ]
})

export class EmployerModule {
}
