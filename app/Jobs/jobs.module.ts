import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../Shared/shared.module';
import { JobService } from './job.service';
import { JobDetailsComponent } from './Details/job-details.component';
import { FilterJobsComponent } from './Filter/filter-jobs.component';
import { JobItemComponent } from './JobItem/job-item.component';
import { JobsComponent } from './Jobs/jobs.component';
import { JobsListComponent } from './List/jobs-list.component';


export const jobsRoutes: Routes = [
  { path: '', component: JobsComponent },
  { path: 'details', component: JobDetailsComponent }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forChild(jobsRoutes),
      NgbModule, SharedModule, CommonModule],
  declarations: [ JobDetailsComponent, FilterJobsComponent, JobItemComponent, JobsComponent, JobsListComponent ],
  providers: [
    JobService
  ]
})

export class JobsModule {
}
