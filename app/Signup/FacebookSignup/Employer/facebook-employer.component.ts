import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../../Core/Services/authorization.service';
import { UserService } from '../../../User/user.service';
import { Option } from '../../../global-types';
import { User } from '../../../User/User';
import { Helper } from '../../../helper';

@Component({
  selector: 'app-facebook-employer',
  moduleId: module.id,
  templateUrl: 'facebook-employer.component.html',
  styleUrls: ['facebook-employer.component.css']
})

export class FacebookEmployerComponent implements OnInit {
  employerForm: FormGroup;
  birthday: any;
  user: User;
  calendarSettings: Object = {};

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserService, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.calendarSettings = {
      maxDate: Helper.datePickerFormat(Helper.subtractYear(18)),
      minDate: Helper.datePickerFormat(Helper.subtractYear(70))
    };

    this.employerForm = this.formBuilder.group({
      birthday: ['', [Validators.required]],
      phone: ''
    });
    this.userService.getUser().subscribe(
      (response) => {
        this.user = response;
      });
  }

  validateControl(controlName: string): boolean {
    let control = this.employerForm.get(controlName);

    return !control.valid && control.touched;
  }

  employerSignup(): void {
    if (!Helper.submitForm(this.employerForm, this.user))
      return;

    this.userService.create(this.user).subscribe(
      (response) => {
        let username = this.user.username,
            facebookAccessToken = localStorage.getItem('facebookAccessToken');

        this.authorizeAndLogin(username, facebookAccessToken);
      }
    );
  }

  authorizeAndLogin(username: string, facebookAccessToken: string) {
    this.authorizationService.authorizeWithFacebook(username, facebookAccessToken).subscribe(
      function authorizeSuccess (result: any) {
        this.userService.getUser().subscribe(
          (result: any) => {
            this.router.navigate(['user/profile']);
          },
          (error: any) => { console.log(error); }
        );
      }.bind(this),
    );
  }

}
