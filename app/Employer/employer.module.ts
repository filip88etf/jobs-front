import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EmployerDetailsComponent } from './Details/employer-details.component';
import { SharedModule } from '../Shared/shared.module';
import { EmployerJobModule } from './Jobs/employer-job.module';
import { UserModule } from '../User/user.module';
import { UserComponent } from '../User/User/user.component';
import { EditEmployerComponent } from './Edit/edit-employer.component';
import { EmployerJobsComponent } from './Jobs/employer-jobs.component';
import { ProfileComponent } from '../User/Profile/profile.component';
import { AuthGuardService } from '../Core/Services/auth-guard.service';

export const employerRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  { path: 'profile', canActivate: [AuthGuardService], component: UserComponent, children:
    [
      { path: '', canActivate: [AuthGuardService], component: ProfileComponent },
      { path: 'edit', canActivate: [AuthGuardService], component: EditEmployerComponent },
      { path: 'jobs', canActivate: [AuthGuardService], component: EmployerJobsComponent }
    ]
  },
  { path: 'details', component: EmployerDetailsComponent }
];

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, SharedModule,
    RouterModule.forChild(employerRoutes), UserModule, EmployerJobModule ],
  declarations: [ EditEmployerComponent, EmployerDetailsComponent ],
  exports: [ EditEmployerComponent ]
})

export class EmployerModule {
}
