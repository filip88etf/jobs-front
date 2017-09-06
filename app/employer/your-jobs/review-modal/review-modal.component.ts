import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Worker } from '../../../worker/Worker';
import { Helper } from '../../../helper';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'app-review-modal',
  templateUrl: 'review-modal.component.html',
  styleUrls: ['review-modal.component.css']
})

export class ReviewModalComponent implements OnInit {
  candidates: Worker[];
  reviewForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal,
    private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({});
  }

  public init(acceptedCandidates: Worker[]) {
    this.candidates = acceptedCandidates;
  }

  public submit(): void {
    let reviews: Object;

    if (Helper.submitForm(this.reviewForm, reviews)) {
      this.notificationService.startLoading();
      this.activeModal.close(false);

      this.notificationService.stopLoading();
    }
  }

  public close(): void {
    this.activeModal.dismiss('close');
  }
}
