import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../toast.service';
import { JobService } from '../../Job/job.service';
import { ConfirmModalComponent } from '../../Shared/ConfirmModal/confirm-modal.component';
import { EditJobComponent } from './Edit/edit-job.component';
import { PostJobComponent } from './Post/post-job.component';
import { Job } from '../../Job/Job';
import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-jobs',
  templateUrl: 'user-jobs.component.html',
  styleUrls: ['user-jobs.component.css']
})

export class UserJobsComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;
  @ViewChild(EditJobComponent) editModal: EditJobComponent;

  jobs: Job[];

  constructor (private jobService: JobService, private userService: UserService,
    private toastService: ToastService, private modalService: NgbModal) {
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

  openPostModal(): void {
    let modal = this.modalService.open(PostJobComponent, {size: 'lg'});

    modal.result.then(
      (result) => {
        this.addJob(result);
      },
      (reason) => { }
    );
  }

  removeJobFromList(jobId: string): void {
    let i = 0;

    for (i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].id === jobId) {
        this.jobs.splice(i, 1);
        break;
      }
    }
  }

  addJob(job: Job): void {
    this.jobs.push(job);
    this.toastService.success('You successfully posted new job!');
  }
}
