import { Component, ViewChild, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { ConfirmModalComponent } from '../../Shared/ConfirmModal/confirm-modal.component';

@Component({
  moduleId: module.id,
  selector: 'app-user-jobs',
  templateUrl: 'user-jobs.component.html'
})

export class UserJobsComponent implements OnInit {
  jobs: Object[];
  @ViewChild(ConfirmModalComponent) child: ConfirmModalComponent;

  constructor (private userService: UserService) {
  }

  ngOnInit(): void {
    this.jobs = this.userService.getJobs();
  }

  openModal(jobId: string): void {
    console.log(jobId);
    this.child.open('Delete Job', 'Are you sure you want to delete this job?', 'delete');
  }

  deleteJob(): void {
    console.log('delete job');
  }
}
