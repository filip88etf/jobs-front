import { Component, ViewChild, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { ConfirmModalComponent } from '../../Shared/ConfirmModal/confirm-modal.component';
import { EditJobComponent } from './Edit/edit-job.component';

@Component({
  moduleId: module.id,
  selector: 'app-user-jobs',
  templateUrl: 'user-jobs.component.html'
})

export class UserJobsComponent implements OnInit {
  jobs: Object[];
  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;
  @ViewChild(EditJobComponent) editModal: EditJobComponent;

  constructor (private userService: UserService) {
  }

  ngOnInit(): void {
    this.jobs = this.userService.getJobs();
  }

  openDeleteModal(job: Object): void {
    console.log(job);
    this.confirmModal.open('Delete Job', 'Are you sure you want to delete this job?', 'delete');
  }

  openEditModal(job: Object): void {
    console.log(job);
    this.editModal.open(job);
  }

  deleteJob(): void {
    console.log('delete job');
  }
}
