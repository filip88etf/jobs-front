import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../../core/services/toast.service';
import { JobService } from '../../../jobs/job.service';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { EditJobComponent } from './../edit/edit-job.component';
import { PostJobComponent } from './../post/post-job.component';
import { Job } from '../../../jobs/Job';
import { UserService } from '../../../user/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-employer-jobs',
  templateUrl: 'employer-jobs.component.html',
  styleUrls: ['employer-jobs.component.css']
})

export class EmployerJobsComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;
  @ViewChild(EditJobComponent) editModal: EditJobComponent;
  page: number = 1;
  totalNumber: number;
  size: number = 10;
  jobs: Job[];

  constructor (private router: Router, private jobService: JobService, private userService: UserService,
    private toastService: ToastService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (user) => {
        this.jobService.getByUsername(user.username).subscribe(
          (response) => {
            this.jobs = response;
            this.totalNumber = response.length;
        } );
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

  public pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.router.navigate(['workers', {page: this.page}]);
  }
}
