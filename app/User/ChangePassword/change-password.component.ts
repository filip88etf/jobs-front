import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GlobalValidators } from '../../global-validators';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html'
})

export class ChangePasswordComponent implements OnInit {
  user: User;
  changePasswordForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit () {
    this.user = new User();
    this.user.password = '';
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: '',
      newPasswordGroup: this.formBuilder.group({
        newPassword: '',
        confirmNewPassword: ''
      }, {validator: GlobalValidators.passwordMatcher('newPassword', 'confirmNewPassword')})
    });
  }

  changePassword() {
    let controls = this.changePasswordForm.controls;

    // this.userService.verifyPassword(controls['oldPassword'].value).subscribe(
    //   function success(isOk: boolean) {
    //     if (isOk) {
    //       this.userService.changePassword(controls['newPassword'].value).subscribe(
    //         function success() {},
    //         function fail() {}
    //       );
    //     } else {
    //       console.log('testko');
    //     }
    //   }
    // );
    console.log(controls['oldPassword'].value);
  }
}
