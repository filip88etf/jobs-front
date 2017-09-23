import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ReviewService } from '../../reviews/review.service';
import { Helper } from '../../helper';
import { User } from '../../user/User';
import { UserService } from '../../user/user.service';
import { JobService } from '../../jobs/job.service';
import { Job } from '../../jobs/Job';
import { ApplicationService } from '../../applications/application.service';
import { Application } from '../../applications/Application';
import { ToastService } from '../../core/services/toast.service';

@Component({
  moduleId: module.id,
  selector: 'app-request-review',
  templateUrl: 'request-review.modal.html',
  styleUrls: ['request-review.modal.css']
})

export class RequestReviewModal implements OnInit {
  reviewForm: FormGroup;
  worker: Worker;

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal, private jobService: JobService,
    private userService: UserService, private reviewService: ReviewService, private toastService: ToastService,
    private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      employerusername: ''
    });
    this.userService.getUser().subscribe(
      (worker: any) => {
        this.worker = worker;
    });
  }

  public submit(): void {
    let employer: Object = {workerid: this.worker['id']};

    if (Helper.submitForm(this.reviewForm, employer)) {
      this.reviewService.verifyRequestReview(employer).subscribe((response: any) => {
        switch (response.status) {
          case 'ok':
            this.requestReview(employer);
            break;
          case 'review_exists':
            this.toastService.warning('You already have review from ' + employer['employerusername']);
            break;
          case 'no_employer':
            this.toastService.warning('There is no employer with username "' + employer['employerusername'] + '"');
            break;
          case 'request_exists':
            this.toastService.warning('You already requested review from ' + employer['employerusername']);
            break;
        }
      });
    }
  }

  public close(): void {
    this.activeModal.dismiss('close');
  }

  public requestReview(params: any): void {
    let job = new Job(params.employerusername, this.worker['profession'], this.worker['region'][0],
      'This job is created just bacause ' + this.worker['name'], 'inprogress', 'generated');

    this.jobService.create(job).subscribe((job) => {
      let app = new Application(this.worker['id'], job.id, 'accepted', params.employerusername, '', 'generated');
      this.applicationService.create(app).subscribe(
        (response) => {
          this.activeModal.dismiss('close');
      });
    });
  }
}
