import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { IMyOptions } from 'mydatepicker';

import { GlobalValidators } from '../../global-validators';
import { UserService } from '../../User/user.service';
import { WorkerService } from '../../Worker/worker.service';
import { User } from '../../User/User';
import { Worker } from '../../Worker/Worker';
import { GENDER_LIST, CALENDAR_SETTINGS, CITIES, PROFESSIONS } from '../../global-consts';
import { Option } from '../../global-types';
import { Helper } from '../../helper';
import { AuthorizationService } from '../../authorization.service';

@Component({
  moduleId: module.id,
  selector: 'app-worker-signup',
  templateUrl: 'worker-signup.component.html',
  styleUrls: ['worker-signup.component.css']
})

export class WorkerSignupComponent implements OnInit {
  cities: Option[] = CITIES;
  birthdayOptions: IMyOptions = CALENDAR_SETTINGS;
  genders: Option[] = GENDER_LIST;
  professions: Option[] = PROFESSIONS;
  workerForm: FormGroup;
  user: User;
  worker: Worker;
  dateModel: Object;
  calendarSettings: Object = {};

  constructor (private formBuilder: FormBuilder, private userService: UserService, private workerService: WorkerService,
          private authorizationService: AuthorizationService, private router: Router) {
  }

  ngOnInit() {
    this.calendarSettings = {
      maxDate: Helper.datePickerFormat(Helper.subtractYear(18)),
      minDate: Helper.datePickerFormat(Helper.subtractYear(70))
    };

    this.workerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      gender: undefined,
      birthday: '',
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
    this.user = new User('worker');
    this.worker = new Worker();
  }

  workerSignup(): void {
    let isValid = Helper.submitForm(this.workerForm, this.user);

    if (!isValid)
      return;

    this.userService.create(this.user).subscribe(
      (response) => {
        let username = this.workerForm.get('username').value,
            password = this.workerForm.get('passwordGroup').get('password').value,
            worker = new Worker();

        worker.profession = this.workerForm.get('profession').value;
        worker.description = this.workerForm.get('description').value;
        worker.region = this.workerForm.get('region').value.toString();
        worker.userId = response.id;

        this.workerService.create(worker).subscribe(
          () => { this.authorizeAndLogin(username, password, response.id); }
        );
      }
    );
  }

  authorizeAndLogin(username: string, password: string, userId: string): void {
    this.authorizationService.authorize(username, password).subscribe(
      function authorizeSuccess (result: any) {
        this.userService.getByUsername(username).subscribe(
          (result: any) => { this.router.navigate(['user/profile']); },
          (error: any) => { console.log('error in getByUsername'); }
        );
        this.workerService.getByUserId(userId).subscribe(
          (response: any) => {},
          (error: any) => {}
        );
      }.bind(this),
    );
  }
}
