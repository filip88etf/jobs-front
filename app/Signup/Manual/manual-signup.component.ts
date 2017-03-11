import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { IMyOptions } from 'mydatepicker';

import { GlobalValidators } from '../../global-validators';
import { GENDER_LIST, CALENDAR_SETTINGS, Option } from '../../global-consts';
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
  genderItems: Option[] = GENDER_LIST;
  signupForm: FormGroup;
  gender: Option[] = [GENDER_LIST[0]];
  birthday: Object;
  private birthdayOptions: IMyOptions = CALENDAR_SETTINGS;

  constructor(private formBuilder: FormBuilder) {
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
  }

  validateControl(controlName: string): boolean {
    let control = this.signupForm.get(controlName);

    return !control.valid && control.touched;
  }

  manualSignup(): void {
  }
}
