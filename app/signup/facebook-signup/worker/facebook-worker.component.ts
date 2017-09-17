import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { WorkerService } from '../../../worker/worker.service';
import { UserService } from '../../../user/user.service';
import { Worker } from '../../../worker/Worker';
import { CITIES, PROFESSIONS } from '../../../global-consts';
import { Option } from '../../../global-types';
import { Helper } from '../../../helper';
import { AuthorizationService } from '../../../core/services/authorization.service';

@Component({
  moduleId: module.id,
  selector: 'app-facebook-worker',
  templateUrl: 'facebook-worker.component.html',
  styleUrls: ['facebook-worker.component.css']
})

export class FacebookWorkerComponent implements OnInit {
  cities: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  workerForm: FormGroup;
  worker: Worker;
  calendarSettings: Object = {};

  constructor (private formBuilder: FormBuilder, private workerService: WorkerService,
    private userService: UserService, private authorizationService: AuthorizationService, private router: Router) {
  }

  ngOnInit() {
    this.calendarSettings = {
      maxDate: Helper.datePickerFormat(Helper.subtractYear(18)),
      minDate: Helper.datePickerFormat(Helper.subtractYear(70))
    };

    this.workerForm = this.formBuilder.group({
      birthday: '',
      phone: '',
      profession: '',
      region: [],
      description: ''
    });

    this.userService.getUser().subscribe(
      (response: any) => {
        this.worker = Object.assign(new Worker(), response);
        this.worker.type = 'worker';
      }
    );
  }

  public workerSignup(): void {
    if (!Helper.submitForm(this.workerForm, this.worker))
      return;

    this.workerService.create(this.worker).subscribe(
      (response) => {
        let username = response.username,
            facebookAccessToken = localStorage.getItem('facebookAccessToken');

        this.authorizeAndLogin(username, facebookAccessToken);
      }
    );
  }

  private authorizeAndLogin(username: string, facebookAccessToken: string): void {
    this.authorizationService.authorizeWithFacebook(username, facebookAccessToken).subscribe(
      (result: any) => {
        this.workerService.getByUsername(username).subscribe(
          (result: any) => {
            this.workerService.getWorker().subscribe((worker: any) => { this.userService.setUser(worker); });
            this.router.navigate(['worker/profile']); },
          (error: any) => { console.log(error); }
        );
      }
    );
  }
}
