import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployerJobsComponent } from './list/employer-jobs.component';
import { JobItemComponent } from './job-item/job-item.component';
import { EditJobModal } from './edit/edit-job.modal';
import { PostJobModal } from './post/post-job.modal';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmModal } from '../../shared/confirm/confirm.modal';
import { EmployerJobDetailsComponent } from './details/employer-job-details.component';
import { CandidateComponent } from './candidate/candidate.component';
import { ReviewWorkersModal } from './review-workers/review-workers.modal';

@NgModule({
  imports: [CommonModule, SharedModule, NgbModule, FormsModule, ReactiveFormsModule],
  declarations: [EmployerJobsComponent, EmployerJobDetailsComponent, JobItemComponent,
    EditJobModal, PostJobModal, CandidateComponent, ReviewWorkersModal],
  exports: [EmployerJobsComponent],
  entryComponents: [PostJobModal, EditJobModal, ConfirmModal, ReviewWorkersModal]
})

export class EmployerJobModule {
}
