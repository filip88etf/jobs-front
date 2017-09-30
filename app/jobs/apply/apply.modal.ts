import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Helper } from '../../helper';
import { Job } from '../Job';
import { User } from '../../user/User/';
import { Application } from '../../applications/Application';
import { ApplicationService } from '../../applications/application.service';

@Component({
  moduleId: module.id,
  selector: 'app-apply-modal',
  templateUrl: 'apply.modal.html'
})

export class ApplyModal {
  applyForm: FormGroup;
  user: User;
  job: Job;

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private applicationService: ApplicationService) {
    this.applyForm = formBuilder.group({
      comment: ''
    });
  }

  public init(job: Job, user: User): void {
    this.job = job;
    this.user = user;
  }

  public submit(): void {
    let application: Application = new Application(this.user.id, this.job.id, 'pending', this.job.username);
    Helper.submitForm(this.applyForm, application);

    this.applicationService.create(application).subscribe(
      (response) => {
        this.activeModal.close(response);
      }
    );
  }

  public close(): void {
    this.activeModal.dismiss('close');
  }
}
