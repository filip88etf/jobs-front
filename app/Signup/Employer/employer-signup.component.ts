import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../authorization.service';
import { UserService } from '../../User/user.service';
import { GlobalValidators } from '../../global-validators';
import { GENDER_LIST, CALENDAR_SETTINGS } from '../../global-consts';
import { Option } from '../../global-types';
import { User } from '../../User/User';
import { Helper } from '../../helper';

const MIN_LENGHT: number = 2;



@Component({
  selector: 'app-employer-signup',
  moduleId: module.id,
  templateUrl: 'employer-signup.component.html',
  styleUrls: ['employer-signup.component.css']
})

export class EmployerSignupComponent implements OnInit {
  employerForm: FormGroup;
  birthdayOptions: IMyOptions = CALENDAR_SETTINGS;
  birthday: any;
  genders: Option[] = GENDER_LIST;
  user: User;

  constructor(private formBuilder: FormBuilder,  private router: Router,
    private userService: UserService, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.employerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      gender: undefined,
      birthday: ['', [Validators.required]],
      phone: '',
      email: ['', [GlobalValidators.emailValidator]],
      username: '',
      passwordGroup: this.formBuilder.group({
        password: '',
        confirmPassword: ''
      }, {validator: GlobalValidators.passwordMatcher('password', 'confirmPassword')})
    });
    this.user = new User();
  }

  validateControl(controlName: string): boolean {
    let control = this.employerForm.get(controlName);

    return !control.valid && control.touched;
  }

  employerSignup(): void {
    let isValid = Helper.submitForm(this.employerForm, this.user);

    if (!isValid)
      return;

    this.userService.create(this.user).subscribe(
      (response) => {
        let username = this.employerForm.get('username').value,
            password = this.employerForm.get('passwordGroup').get('password').value;

        this.authorizeAndLogin(username, password);
      }
    );
  }

  authorizeAndLogin(username: string, password: string) {
    this.authorizationService.authorize(username, password).subscribe(
      function authorizeSuccess (result: any) {
        console.log('authorizeSuccess');
        this.userService.getByUsername(username).subscribe(
          (result: any) => { this.router.navigate(['user/profile']); },
          (error: any) => { console.log('error in getByUsername'); }
        );
      }.bind(this),
    );
  }

}
