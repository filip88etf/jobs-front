import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Helper } from '../../helper';

@Component({
  moduleId: module.id,
  selector: 'app-request-review',
  templateUrl: 'request-review.modal.html',
  styleUrls: ['request-review.modal.css']
})

export class RequestReviewModal implements OnInit {
  reviewForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({});
  }

  public submit(): void {
    let reviews: any = {};

    if (Helper.submitForm(this.reviewForm, reviews)) {
    }
  }

  public close(): void {
    this.activeModal.dismiss('close');
  }

}
