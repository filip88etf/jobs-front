import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserJobsComponent } from './user-jobs.component';
import { UserJobItemComponent } from './JobItem/user-job-item.component';
import { EditJobComponent } from './Edit/edit-job.component';
import { PostJobComponent } from './Post/post-job.component';
import { SharedModule } from '../../Shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, ModalModule, FormsModule, ReactiveFormsModule],
  declarations: [UserJobsComponent, UserJobItemComponent, EditJobComponent, PostJobComponent],
  exports: [UserJobsComponent, UserJobItemComponent, EditJobComponent, PostJobComponent]
})

export class UserJobModule {
}
