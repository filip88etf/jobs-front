import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalValidators } from '../../global-validators';
import { UserService } from '../../User/user.service';
import { User } from '../../User/User';
import { CITIES, PROFESSIONS } from '../../global-consts';
import { Option } from '../../global-types';
import { Helper } from '../../helper';
import { AuthorizationService } from '../../authorization.service';

@Component({
  moduleId: module.id,
  selector: 'app-employee-signup',
  templateUrl: 'employee-signup.component.html',
  styleUrls: ['employee-signup.component.css']
})

export class EmployeeSignupComponent implements OnInit {
  employeeForm: FormGroup;
  cities: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  @Input() user: User;

  constructor (private formBuilder: FormBuilder, private userSerivce: UserService,
          private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
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
      profession: '',
      region: [],
      description: ''
    });
  }

  validateControl(controlName: string): boolean {
    let control = this.employeeForm.get(controlName);

    return !control.valid && control.touched;
  }

  employeeSignup(): void {
    if (Helper.submitForm(this.employeeForm, this.user)) {
      this.userSerivce.create(this.user).subscribe(() => {});
    }
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
