import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';
import { Router } from '@angular/router';

import { UserService } from '../../User/user.service';
import { GlobalValidators } from '../../global-validators';
import { GENDER_LIST, ROLES, CALENDAR_SETTINGS } from '../../global-consts';
import { Option } from '../../global-types';
import { User } from '../../User/User';

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

  constructor(private formBuilder: FormBuilder, private userSerivce: UserService, private router: Router) {
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(MIN_LENGHT)]],
      lastName: ['', [Validators.required, Validators.minLength(MIN_LENGHT)]],
      gender: undefined,
      birthday: ['', [Validators.required]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, GlobalValidators.emailValidator]],
      username: ['', [Validators.required, Validators.minLength(MIN_LENGHT)]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: GlobalValidators.passwordMatcher('password', 'confirmPassword')}),
      role: 'employer'
    });
    this.user = new User();
  }

  validateControl(controlName: string): boolean {
    let control = this.signupForm.get(controlName);

    return !control.valid && control.touched;
  }

  manualSignup(): void {
    this.mapFormToUser();
    if (this.signupForm.get('role').value === 'employer') {
          this.userSerivce.create(this.user).subscribe(
            (response) => {
              this.router.navigate(['user/profile']);
            }
          );
      return;
    }

    this.isEmployee = true;
  }

  private mapFormToUser (): void {
    this.user.firstName = this.signupForm.get('firstName').value;
    this.user.lastName = this.signupForm.get('lastName').value;
    this.user.birth = this.birthday.jsdate.toString();
    this.user.gender = this.signupForm.get('gender').value;
    this.user.phone = this.signupForm.get('phone').value;
    this.user.email = this.signupForm.get('email').value;
    this.user.username = this.signupForm.get('username').value;
    this.user.password = this.signupForm.get('passwordGroup').get('password').value;
  }
}
