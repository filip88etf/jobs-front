import { Component, ViewChild, OnInit } from '@angular/core';

import { JobService } from '../../Job/job.service';
import { ConfirmModalComponent } from '../../Shared/ConfirmModal/confirm-modal.component';
import { EditJobComponent } from './Edit/edit-job.component';
import { Job } from '../../Job/Job';
import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-jobs',
  templateUrl: 'user-jobs.component.html'
})

export class UserJobsComponent implements OnInit {
  jobs: Job[];
  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;
  @ViewChild(EditJobComponent) editModal: EditJobComponent;

  constructor (private jobService: JobService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.jobs = [new Job()];
    // this.jobService.getJobs('user id goes here').subscribe(
    //   (response) => { this.jobs = response; }
    // );
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
