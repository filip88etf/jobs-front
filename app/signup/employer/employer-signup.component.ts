import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../core/services/authorization.service';
import { EmployerService } from '../../employer/employer.service';
import { UserService } from '../../user/user.service';
import { GlobalValidators } from '../../global-validators';
import { GENDER_LIST } from '../../global-consts';
import { Option } from '../../global-types';
import { Employer } from '../../employer/Employer';
import { Helper } from '../../helper';

@Component({
  selector: 'app-employer-signup',
  moduleId: module.id,
  templateUrl: 'employer-signup.component.html',
  styleUrls: ['employer-signup.component.css']
})

export class EmployerSignupComponent implements OnInit {
  employerForm: FormGroup;
  birthday: any;
  genders: Option[] = GENDER_LIST;
  employer: Employer;
  calendarSettings: Object = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService,
    private employerService: EmployerService, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.calendarSettings = {
      maxDate: Helper.datePickerFormat(Helper.subtractYear(18)),
      minDate: Helper.datePickerFormat(Helper.subtractYear(70))
    };

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
    this.employer = new Employer();
  }

  validateControl(controlName: string): boolean {
    let control = this.employerForm.get(controlName);

    return !control.valid && control.touched;
  }

  employerSignup(): void {
    if (!Helper.submitForm(this.employerForm, this.employer))
      return;

    this.employerService.create(this.employer).subscribe(
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
        this.employerService.getByUsername(username).subscribe(
          (result: any) => {
            this.employerService.getEmployer().subscribe((employer: any) => { this.userService.setUser(employer); });
            this.router.navigate(['employer/profile']);
          },
          (error: any) => { console.log(error); }
        );
      }.bind(this),
    );
  }

}
