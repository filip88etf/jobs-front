import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { ToastService } from '../../toast.service';

import { GlobalValidators } from '../../global-validators';
import { UserService } from '../user.service';
import { Helper } from '../../helper';

@Component({
  moduleId: module.id,
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styles: []
})

export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  wrongPassword: boolean = false;
  @ViewChild('changePasswordModal') public modal: ModalDirective;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
    private toastService: ToastService) {
  }

  ngOnInit () {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: '',
      newPasswordGroup: this.formBuilder.group({
        newPassword: '',
        confirmNewPassword: ''
      }, {validator: GlobalValidators.passwordMatcher('newPassword', 'confirmNewPassword')})
    });
  }

  close() {
    this.wrongPassword = false;
    this.changePasswordForm.reset();
    this.modal.hide();
  }

  open() {
    this.modal.show();
  }

  revalidate() {
    this.wrongPassword = false;
  }

  changePassword() {
    let controls = this.changePasswordForm.controls;

    if (!Helper.submitForm(this.changePasswordForm, {}))
      return;

    this.userService.verifyPassword(controls['oldPassword'].value).subscribe(
      function success(isOk: boolean) {
        if (isOk) {
          let group = <FormGroup> controls['newPasswordGroup'];

          this.userService.changePassword(group.controls['newPassword'].value).subscribe(
            (response: any) => {
              this.close();
              this.toastService.success('You successfully change your password!');
            },
            (error: any) => { this.close(); }
          );
        } else {
          this.wrongPassword = true;
        }
      }.bind(this),
      function fail(error: any) {
        console.log(error);
      }
    );
  }
}
