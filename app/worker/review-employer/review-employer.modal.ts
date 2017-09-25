import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Helper } from '../../helper';
import { Review } from '../../reviews/Review';
import { ReviewService } from '../../reviews/review.service';
import { Employer } from '../../employer/Employer';
import { NotificationService } from '../../core/services/notification.service';
import { EmployerService } from '../../employer/employer.service';
import { Job } from '../../jobs/Job';
import { UserService } from '../../user/user.service';
import { User } from '../../user/User';

@Component({
  moduleId: module.id,
  selector: 'app-review-employer',
  templateUrl: 'review-employer.modal.html',
  styleUrls: ['review-employer.modal.css']
})

export class ReviewEmployerModal implements OnInit {
  reviewForm: FormGroup;
  isUp: boolean;
  isSubmited: boolean = false;
  employer: Employer;
  worker: Worker;
  job: Job;

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal,
    private employerService: EmployerService, private notificationService: NotificationService,
    private reviewService: ReviewService, private userService: UserService) {
  }

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      comment: ''
    });
    this.userService.getCurrentUser().subscribe((response: any) => {
      this.worker = response;
    });
    this.employerService.getByUsername(this.job.username).subscribe(
      (employer: Employer) => {
        this.employer = employer;
      }
    );
  }

  public init(job: Job) {
    this.job = job;
  }

  public submit(): void {
    let review: any = {};
    this.isSubmited = true;

    if (Helper.submitForm(this.reviewForm, review) && (this.isUp || this.isUp === false)) {
      this.notificationService.startLoading();
      this.reviewService.createEmployerReview(this.mapReview(review)).subscribe(() => {
        this.activeModal.close(false);
        this.notificationService.stopLoading();
      });
    }
  }

  public close(): void {
    this.activeModal.dismiss('close');
  }

  private mapReview(review: any): Object {
    return {
        workerId: this.worker['id'],
        workerUsername: this.worker['username'],
        employerId: this.employer['id'],
        employerUsername: this.employer['username'],
        jobId: this.job.id,
        review: review.review,
        recommended: review.recommended
      };
  }
}
