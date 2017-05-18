import { Component, ViewChild, OnInit } from '@angular/core';

import { ToastService } from '../../toast.service';
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
  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;
  @ViewChild(EditJobComponent) editModal: EditJobComponent;
  jobs: Job[];

  constructor (private jobService: JobService, private userService: UserService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (user) => {
        this.jobService.getByUserId(user.id).subscribe(
          (response) => { this.jobs = response; } );
      },
      (error) => { console.log(error); }
    );
  }

  openDeleteModal(job: Object): void {
    this.confirmModal.open('Delete Job', 'Are you sure you want to delete this job?', 'delete');
  }

  openEditModal(job: Object): void {
    this.editModal.open(job);
  }

  deleteJob(job: Job): void {
    this.jobService.delete(job.id).subscribe(
      (response: any) => {
        this.toastService.success('Job is deleted!');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addJob(job: Job): void {
    this.jobs.push(job);
  }
}
