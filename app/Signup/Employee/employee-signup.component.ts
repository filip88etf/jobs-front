import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../User/user.service';
import { User } from '../../User/User';
import { CITIES, PROFESSIONS } from '../../global-consts';
import { Option } from '../../global-types';

@Component({
  moduleId: module.id,
  selector: 'app-employee-signup',
  templateUrl: 'employee-signup.component.html',
  styleUrls: ['employee-signup.component.css']
})

export class EmployeeSignup implements OnInit {
  employeeForm: FormGroup;
  cities: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  @Input() user: User;

  constructor (private formBuilder: FormBuilder, private userSerivce: UserService) {
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      profession: '',
      region: '',
      description: ''
    });
  }

  employeeSignup(): void {
    this.userSerivce.create(this.user).subscribe(() => {});
  }

}
