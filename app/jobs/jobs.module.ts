import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { JobService } from './job.service';
import { JobDetailsComponent } from './details/job-details.component';
import { FilterJobsComponent } from './filter/filter-jobs.component';
import { JobItemComponent } from './job-item/job-item.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsListComponent } from './list/jobs-list.component';
import { ApplyModal } from './apply/apply.modal';

export const jobsRoutes: Routes = [
  { path: '', component: JobsComponent },
  { path: 'details', component: JobDetailsComponent }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forChild(jobsRoutes),
      NgbModule, SharedModule, CommonModule],
  declarations: [ JobDetailsComponent, FilterJobsComponent, JobItemComponent, JobsComponent, JobsListComponent,
    ApplyModal ],
  providers: [
    JobService
  ],
  entryComponents: [ ApplyModal ]
})

export class JobsModule {
}
