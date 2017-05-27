import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserJobsComponent } from './user-jobs.component';
import { UserJobItemComponent } from './JobItem/user-job-item.component';
import { EditJobComponent } from './Edit/edit-job.component';
import { PostJobComponent } from './Post/post-job.component';
import { SharedModule } from '../../Shared/shared.module';
import { ConfirmModalComponent } from '../../Shared/ConfirmModal/confirm-modal.component';

@NgModule({
  imports: [CommonModule, SharedModule, NgbModule, FormsModule, ReactiveFormsModule],
  declarations: [UserJobsComponent, UserJobItemComponent, EditJobComponent, PostJobComponent],
  exports: [UserJobsComponent, UserJobItemComponent, EditJobComponent, PostJobComponent],
  entryComponents: [PostJobComponent, EditJobComponent, ConfirmModalComponent]
})

export class UserJobModule {
}
