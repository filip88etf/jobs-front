import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../User/user.service';
import { User } from '../../User/User';
import { CITIES, PROFFESSIONS, Option } from '../../global-consts';

@Component({
  moduleId: module.id,
  selector: 'app-employee-signup',
  templateUrl: 'employee-signup.component.html',
  styleUrls: ['employee-signup.component.css']
})

export class EmployeeSignup implements OnInit {
  employeeForm: FormGroup;
  cities: Option[] = CITIES;
  professions: Option[] = PROFFESSIONS;
  @Input() user: User;

  constructor (private formBuilder: FormBuilder, private userSerivce: UserService) {
  }

  ngOnInit () {
    this.employeeForm = this.formBuilder.group({
      jobDescription: ['', [Validators.required]],
      city: ''
    });
  }

  employeeSignup(): void {
    console.log(this.user);
    this.userSerivce.create(this.user).subscribe(() => {console.log('aaaaa'); });
  }

}
