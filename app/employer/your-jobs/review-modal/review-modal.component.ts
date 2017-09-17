import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Worker } from '../../../worker/Worker';
import { Helper } from '../../../helper';
import { Review } from '../../../reviews/Review';
import { User } from '../../../user/User';
import { NotificationService } from '../../../core/services/notification.service';
import { ReviewService } from '../../../reviews/review.service';
import { UserService } from '../../../user/user.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  moduleId: module.id,
  selector: 'app-review-modal',
  templateUrl: 'review-modal.component.html',
  styleUrls: ['review-modal.component.css']
})

export class ReviewModalComponent implements OnInit {
  candidates: Worker[];
  reviewForm: FormGroup;
  isUp: boolean[] = [];
  isSubmited: boolean = false;
  loggedEmployer: User;
  jobId: string;

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal, private userService: UserService,
    private notificationService: NotificationService, private reviewService: ReviewService,
    private toastService: ToastService, private router: Router) {
  }

  ngOnInit() {
    let inputs = this.createReviewFields();
    this.reviewForm = this.formBuilder.group(inputs);
    this.userService.getUser().subscribe(
      (loggedEmployer) => {
        this.loggedEmployer = loggedEmployer;
      }
    );
  }

  public init(acceptedCandidates: Worker[], jobId: string) {
    this.candidates = acceptedCandidates;
    this.jobId = jobId;
  }

  public submit(): void {
    let reviews: any = {};
    this.isSubmited = true;

    if (Helper.submitForm(this.reviewForm, reviews) && this.recomendationsDone()) {
      this.notificationService.startLoading();
      this.reviewService.createReviews(this.mapReviews(reviews)).subscribe(() => {
        this.activeModal.close(false);
        this.notificationService.stopLoading();
        this.toastService.success('Congrats, your job is done!');
        this.router.navigate(['']);
      });
    }
  }

  public close(): void {
    this.activeModal.dismiss('close');
  }

  private createReviewFields () {
    let fields: Object = {};

    for (let i = 0; i < this.candidates.length; i++) {
      fields['candidate' + i] = '';
    }
    return fields;
  }

  private mapReviews(reviewMap: Object): Object[] {
    let reviews: Object[] = [],
        i: number = 0;

    for (let review in reviewMap) {
      reviews.push({
        workerId: this.candidates[i].id,
        workerUsername: this.candidates[i].username,
        employerId: this.loggedEmployer.id,
        employerUsername: this.loggedEmployer.username,
        jobId: this.jobId,
        review: reviewMap[review],
        recomended: this.isUp[i++]
      });
    }
    return reviews;
  }

  private recomendationsDone(): boolean {
    let done = true;
    for (let i = 0; i < this.candidates.length; i++) {
      if (this.isUp[i] === undefined) {
        done = false;
      }
    }

    return done;
  }
}
