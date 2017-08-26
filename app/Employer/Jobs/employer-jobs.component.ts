import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../Core/Services/toast.service';
import { JobService } from '../../Jobs/job.service';
import { ConfirmModalComponent } from '../../Shared/ConfirmModal/confirm-modal.component';
import { EditJobComponent } from './Edit/edit-job.component';
import { PostJobComponent } from './Post/post-job.component';
import { Job } from '../../Jobs/Job';
import { UserService } from '../../User/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-employer-jobs',
  templateUrl: 'employer-jobs.component.html',
  styleUrls: ['employer-jobs.component.css']
})

export class EmployerJobsComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;
  @ViewChild(EditJobComponent) editModal: EditJobComponent;

  jobs: Job[];

  constructor (private jobService: JobService, private userService: UserService,
    private toastService: ToastService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (user) => {
        this.jobService.getByUsername(user.username).subscribe(
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
