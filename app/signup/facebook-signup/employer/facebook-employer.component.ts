import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../../core/services/authorization.service';
import { UserService } from '../../../user/user.service';
import { EmployerService } from '../../../employer/employer.service';
import { Option } from '../../../global-types';
import { Employer } from '../../../employer/Employer';
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
  employer: Employer;
  calendarSettings: Object = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private employerService: EmployerService,
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
      (response: any) => {
        this.employer = Object.assign(new Employer(), response);
        this.employer.type = 'employer';
      });
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
        let username = this.employer.username,
            facebookAccessToken = localStorage.getItem('facebookAccessToken');

        this.authorizeAndLogin(username, facebookAccessToken);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  authorizeAndLogin(username: string, facebookAccessToken: string) {
    this.authorizationService.authorizeWithFacebook(username, facebookAccessToken).subscribe(
      (result: any) => {
        this.employerService.getEmployer().subscribe(
          (result: any) => {
            this.employerService.getEmployer().subscribe((employer: any) => { this.userService.setUser(employer); });
            this.router.navigate(['employer/profile']);
          },
          (error: any) => { console.log(error); }
        );
      }
    );
  }

}
