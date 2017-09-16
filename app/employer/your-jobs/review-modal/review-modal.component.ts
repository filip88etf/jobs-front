import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Worker } from '../../../worker/Worker';
import { Helper } from '../../../helper';
import { Review } from '../../../reviews/Review';
import { NotificationService } from '../../../core/services/notification.service';
import { ReviewService } from '../../../reviews/review.service';

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

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal,
    private notificationService: NotificationService, private reviewService: ReviewService) {
  }

  ngOnInit() {
    let inputs = this.createReviewFields();
    this.reviewForm = this.formBuilder.group(inputs);
  }

  public init(acceptedCandidates: Worker[]) {
    this.candidates = acceptedCandidates;
  }

  public submit(): void {
    let reviews = {};
    this.isSubmited = true;

    if (Helper.submitForm(this.reviewForm, reviews) && this.recomendationsDone()) {
      this.notificationService.startLoading();
      reviews = this.mapReviews(reviews);
      this.reviewService.createReviews().subscribe(() => {

      });
      this.activeModal.close(false);
      this.notificationService.stopLoading();
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
        id: this.candidates[i].id,
        review: reviewMap[review],
        recomanded: this.isUp[i++]
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
