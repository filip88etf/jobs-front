import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployerJobsComponent } from './list/employer-jobs.component';
import { JobItemComponent } from './job-item/job-item.component';
import { EditJobComponent } from './edit/edit-job.component';
import { PostJobComponent } from './post/post-job.component';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { EmployerJobDetailsComponent } from './details/employer-job-details.component';

@NgModule({
  imports: [CommonModule, SharedModule, NgbModule, FormsModule, ReactiveFormsModule],
  declarations: [EmployerJobsComponent, EmployerJobDetailsComponent, JobItemComponent,
    EditJobComponent, PostJobComponent],
  exports: [EmployerJobsComponent, JobItemComponent, EditJobComponent, PostJobComponent],
  entryComponents: [PostJobComponent, EditJobComponent, ConfirmModalComponent]
})

export class EmployerJobModule {
}
