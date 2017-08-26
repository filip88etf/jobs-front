import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployerJobsComponent } from './employer-jobs.component';
import { JobItemComponent } from './JobItem/job-item.component';
import { EditJobComponent } from './Edit/edit-job.component';
import { PostJobComponent } from './Post/post-job.component';
import { SharedModule } from '../../Shared/shared.module';
import { ConfirmModalComponent } from '../../Shared/ConfirmModal/confirm-modal.component';

@NgModule({
  imports: [CommonModule, SharedModule, NgbModule, FormsModule, ReactiveFormsModule],
  declarations: [EmployerJobsComponent, JobItemComponent, EditJobComponent, PostJobComponent],
  exports: [EmployerJobsComponent, JobItemComponent, EditJobComponent, PostJobComponent],
  entryComponents: [PostJobComponent, EditJobComponent, ConfirmModalComponent]
})

export class EmployerJobModule {
}
