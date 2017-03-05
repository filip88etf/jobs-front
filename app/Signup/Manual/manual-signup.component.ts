import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, AbstractControl } from '@angular/forms';

import { GENDER_LIST, BIRTH_DATE, Option } from '../../global-consts';
import { User } from '../../User/User';

const MIN_LENGHT: number = 2;

function passwordMatcher (control: AbstractControl) {
  let password = control.get('password');
  let confirmPassword = control.get('confirmPassword');
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  if (password.value === confirmPassword.value) {
    return null;
  }
  return {match: true};
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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    console.log(GENDER_LIST);
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(MIN_LENGHT)]],
      lastName: ['', [Validators.required, Validators.minLength(MIN_LENGHT)]],
      phone: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(MIN_LENGHT)]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      }, {validator: passwordMatcher}),
      securityQuestion: ['', Validators.required],
      securityAnswer: ['', Validators.required]
    });
  }


  manualSignup(): void {
    console.log(this.signupForm);
  }
}
