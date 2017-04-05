import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';

import { UserService } from '../../User/user.service';
import { GlobalValidators } from '../../global-validators';
import { GENDER_LIST, ROLES, CALENDAR_SETTINGS, Option } from '../../global-consts';
import { User } from '../../User/User';

const MIN_LENGHT: number = 2;

function passwordMatcher(focus: boolean = true) {
  return (control: AbstractControl) => {
    let password = control.get('password'),
        confirmPassword = control.get('confirmPassword');

    if (password.pristine || confirmPassword.pristine || password.value === confirmPassword.value) {
      return null;
    }
    return {match: true};
  };
}

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
  gender: Option[] = [GENDER_LIST[0]];
  roles: Option[] = ROLES;
  role: Option[] = [ROLES[0]];
  isEmployee: boolean;
  user: User;

  constructor(private formBuilder: FormBuilder, private userSerivce: UserService) {
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(MIN_LENGHT)]],
      lastName: ['', [Validators.required, Validators.minLength(MIN_LENGHT)]],
      birthday: ['', [Validators.required]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, GlobalValidators.emailValidator]],
      username: ['', [Validators.required, Validators.minLength(MIN_LENGHT)]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: passwordMatcher()})
    });
    this.user = new User();
  }

  validateControl(controlName: string): boolean {
    let control = this.signupForm.get(controlName);

    return !control.valid && control.touched;
  }

  manualSignup(): void {
    this.mapFormToUser();
    if (this.role[0].id === 'employer') {
          this.userSerivce.create(this.user).subscribe(() => {console.log('aaaaa'); });
      return;
    }

    this.isEmployee = true;
  }

  private mapFormToUser (): void {
    this.user.firstName = this.signupForm.get('firstName').value;
    this.user.lastName = this.signupForm.get('lastName').value;
    this.user.birth = this.birthday.jsdate.toString();
    this.user.gender = this.gender[0].id;
    this.user.phone = this.signupForm.get('phone').value;
    this.user.email = this.signupForm.get('email').value;
    this.user.username = this.signupForm.get('username').value;
    this.user.password = this.signupForm.get('passwordGroup').get('password').value;
  }
}
