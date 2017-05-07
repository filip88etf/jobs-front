import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../authorization.service';
import { UserService } from '../../User/user.service';
import { GlobalValidators } from '../../global-validators';
import { GENDER_LIST, ROLES, CALENDAR_SETTINGS } from '../../global-consts';
import { Option } from '../../global-types';
import { User } from '../../User/User';
import { Helper } from '../../helper';

const MIN_LENGHT: number = 2;



@Component({
  selector: 'app-manual-signup',
  moduleId: module.id,
  templateUrl: 'manual-signup.component.html',
  styleUrls: ['manual-signup.component.css']
})

export class ManualSignupComponent implements OnInit {
  signupForm: FormGroup;
  birthdayOptions: IMyOptions = CALENDAR_SETTINGS;
  birthday: any;
  genders: Option[] = GENDER_LIST;
  roles: Option[] = ROLES;
  isEmployee: boolean;
  user: User;

  constructor(private formBuilder: FormBuilder,  private router: Router,
    private userService: UserService, private authorizationSerivce: AuthorizationService) {
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
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
      }, {validator: GlobalValidators.passwordMatcher('password', 'confirmPassword')}),
      role: 'employee'
    });
    this.user = new User();
  }

  validateControl(controlName: string): boolean {
    let control = this.signupForm.get(controlName);

    return !control.valid && control.touched;
  }

  manualSignup(): void {
        this.isEmployee = true;
    let isValid = Helper.submitForm(this.signupForm, this.user);

    if (!isValid)
      return;

    if (this.signupForm.get('role').value === 'employer') {
          this.userService.create(this.user).subscribe(
            (response) => {
              let username = this.signupForm.get('username').value,
                  password = this.signupForm.get('passwordGroup').get('password').value;

              this.authorizeAndLogin(username, password);
            }
          );
      return;
    }

    this.isEmployee = true;
  }

  authorizeAndLogin(username: string, password: string) {
    this.authorizationSerivce.authorize(username, password).subscribe(
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
