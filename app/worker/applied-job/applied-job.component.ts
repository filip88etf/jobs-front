import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { Helper } from '../../helper';
import { JobService } from '../../jobs/job.service';
import { Job } from '../../jobs/Job';
import { ReviewEmployerModal } from '../review-employer/review-employer.modal';

@Component({
  moduleId: module.id,
  selector: 'app-applied-job',
  templateUrl: 'applied-job.component.html',
  styleUrls: ['applied-job.component.css']
})

export class AppliedJobComponent {
  noPicture: string = 'assets/images/no-job-picture.png';
  @Input() job: Job;

  constructor(private router: Router, private modalService: NgbModal) {
  }

  public openJobDetails(): void {
    this.router.navigate(['jobs/details', { id: this.job.id, username: this.job.username }]);
  }

  public getStatus(): string {
    return Helper.getStatus(this.job.status);
  }

  public openReviewEmployer(): void {
    let modal = this.modalService.open(ReviewEmployerModal);

    modal.componentInstance.init(this.job);
    modal.result.then(
      (result) => {
      },
      (reason) => { }
    );
  }
}
