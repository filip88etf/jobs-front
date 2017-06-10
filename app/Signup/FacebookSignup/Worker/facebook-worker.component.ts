import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { UserService } from '../../../User/user.service';
import { WorkerService } from '../../../Worker/worker.service';
import { User } from '../../../User/User';
import { Worker } from '../../../Worker/Worker';
import { CITIES, PROFESSIONS } from '../../../global-consts';
import { Option } from '../../../global-types';
import { Helper } from '../../../helper';
import { AuthorizationService } from '../../../Core/Services/authorization.service';

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
  user: User;
  worker: Worker;
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
      birthday: '',
      phone: '',
      profession: '',
      region: [],
      description: ''
    });

    this.userService.getUser().subscribe(
      (response: any) => { this.user = response; }
    );
    this.worker = new Worker();
  }

  public workerSignup(): void {
    if (!Helper.submitForm(this.workerForm, this.user))
      return;

    this.userService.create(this.user).subscribe(
      (response) => {
        let username = this.user.username,
            facebookAccessToken = localStorage.getItem('facebookAccessToken'),
            worker = new Worker();

        worker.profession = this.workerForm.get('profession').value;
        worker.description = this.workerForm.get('description').value;
        worker.region = this.workerForm.get('region').value.toString();
        worker.userId = response.id;

        this.workerService.create(worker).subscribe(
          () => { this.authorizeAndLogin(username, facebookAccessToken, response.id); }
        );
      }
    );
  }

  private authorizeAndLogin(username: string, facebookAccessToken: string, userId: string): void {
    this.authorizationService.authorizeWithFacebook(username, facebookAccessToken).subscribe(
      function authorizeSuccess (result: any) {
        this.userService.getByUsername(username).subscribe(
          (result: any) => { this.router.navigate(['user/profile']); },
          (error: any) => { console.log(error); }
        );
        this.workerService.getByUserId(userId).subscribe(
          (response: any) => {},
          (error: any) => {}
        );
      }.bind(this),
    );
  }
}
