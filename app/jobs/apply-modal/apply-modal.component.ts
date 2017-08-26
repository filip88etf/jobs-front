import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Helper } from '../../helper';
import { JobService } from '../job.service';
import { UserService } from '../../user/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-apply-modal',
  templateUrl: 'apply-modal.component.html'
})

export class ApplyModalComponent {
  private applyForm: FormGroup;

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private jobService: JobService, private userService: UserService) {
    this.applyForm = formBuilder.group({
      additionalComment: ''
    });
  }

  public submit(): void {
    let applied = {};
    Helper.submitForm(this.applyForm, applied);
    this.userService.getUser().subscribe(
      (user: any) => {
        applied['userId'] = user['id'];
        this.jobService.apply(applied).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    );

    this.activeModal.close('submit');
  }

  public close(): void {
    this.activeModal.dismiss('close');
  }
}
