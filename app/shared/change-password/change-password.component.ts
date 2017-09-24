import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../core/services/toast.service';
import { GlobalValidators } from '../../global-validators';
import { UserService } from '../../user/user.service';
import { EmployerService } from '../../employer/employer.service';
import { WorkerService } from '../../worker/worker.service';
import { Helper } from '../../helper';
import { User } from '../../user/User';

@Component({
  moduleId: module.id,
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styles: []
})

export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  wrongPassword: boolean = false;
  user: User;

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal, private toastService: ToastService,
    private userService: UserService, private employerService: EmployerService, private workerService: WorkerService) {
  }

  ngOnInit () {
    this.userService.getCurrentUser().subscribe((user) => { this.user = user; });
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: '',
      newPasswordGroup: this.formBuilder.group({
        newPassword: '',
        confirmNewPassword: ''
      }, {validator: GlobalValidators.passwordMatcher('newPassword', 'confirmNewPassword')})
    });
  }

  revalidate() {
    this.wrongPassword = false;
  }

  submit() {
    let controls = this.changePasswordForm.controls;

    if (!Helper.submitForm(this.changePasswordForm, {}))
      return;

    this.userService.verifyPassword(controls['oldPassword'].value).subscribe(
      (isOk: boolean) => {
        if (isOk) {
          let group = <FormGroup> controls['newPasswordGroup'];

          this.userService.changePassword(group.controls['newPassword'].value).subscribe(
            (response: any) => {
              this.activeModal.close();
              this.toastService.success('You successfully change your password!');
            },
            (error: any) => { this.close(); }
          );
        } else {
          this.wrongPassword = true;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  close() {
    this.activeModal.dismiss('close');
  }
}
