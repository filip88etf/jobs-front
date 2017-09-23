import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  selector: 'app-review-workers',
  templateUrl: 'review-workers.modal.html',
  styleUrls: ['review-workers.modal.css']
})

export class ReviewWorkersModal implements OnInit {
  candidates: Worker[];
  reviewForm: FormGroup;
  isUp: boolean[] = [];
  isSubmited: boolean = false;
  loggedEmployer: User;
  jobId: string;
  reviewedCandidates: Worker[] = [];
  candidatesToReview: Worker[] = [];

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal, private userService: UserService,
    private notificationService: NotificationService, private reviewService: ReviewService,
    private toastService: ToastService) {
      this.reviewForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (loggedEmployer) => {
        this.loggedEmployer = loggedEmployer;
        this.reviewService.doesReviewExist(this.getCandidateIds(), loggedEmployer.username).subscribe(
          (response) => {
            let inputs: Object;

            this.seperateReviewedAndToReviewCandidates(response);
            inputs = this.createReviewFields();
            this.reviewForm = this.formBuilder.group(inputs);
          }
        );
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
      });
    }
  }

  public close(): void {
    this.activeModal.dismiss('close');
  }

  private createReviewFields (): Object {
    let fields: Object = {};

    for (let i = 0; i < this.candidatesToReview.length; i++) {
      fields['candidate' + i] = '';
    }
    return fields;
  }

  private mapReviews(reviewMap: Object): Object[] {
    let reviews: Object[] = [],
        i: number = 0;

    for (let review in reviewMap) {
      reviews.push({
        workerId: this.candidatesToReview[i].id,
        workerUsername: this.candidatesToReview[i].username,
        employerId: this.loggedEmployer.id,
        employerUsername: this.loggedEmployer.username,
        jobId: this.jobId,
        review: reviewMap[review],
        recommended: this.isUp[i++]
      });
    }
    return reviews;
  }

  private recomendationsDone(): boolean {
    let done = true;
    for (let i = 0; i < this.candidatesToReview.length; i++) {
      if (this.isUp[i] === undefined) {
        done = false;
      }
    }

    return done;
  }

  private getCandidateIds(): string[] {
    let ids: string[] = [];

    for (let i = 0; i < this.candidates.length; i++) {
      ids.push(this.candidates[i].id);
    }

    return ids;
  }

  private seperateReviewedAndToReviewCandidates(isReviewedMap: any): void {
    for (let workerId in isReviewedMap) {
      for (let candidate of this.candidates) {
        if (candidate['id'].toString() === workerId) {
          if (isReviewedMap[workerId]) {
            this.reviewedCandidates.push(candidate);
          } else {
            this.candidatesToReview.push(candidate);
          }
        }
      }
    }
  }
}
