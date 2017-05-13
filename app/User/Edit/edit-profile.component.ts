import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';

import { User } from '../User';
import { GENDER_LIST } from '../../global-consts';
import { Option } from '../../global-types';
import { UserService } from '../user.service';
import { Helper } from '../../helper';

@Component({
  moduleId: module.id,
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  user: User;
  selected: Option[] = [GENDER_LIST[0]];
  options: Option[] = GENDER_LIST;
  editForm: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder,
    private router: Router, private toastService: ToastService) {
  }

  ngOnInit () {
    this.user = new User();
    this.editForm = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      gender: this.user.gender,
      phone: this.user.phone,
      email: this.user.email
    });

    this.userService.getUser().subscribe(
      (response) => {
        this.user = response;
        Helper.updateForm(this.editForm, this.user);
      },
      (error) => { console.log(error); }
    );
  }

  save() {
    let user = Object.assign(new User(), this.user);

    if (Helper.submitForm(this.editForm, user)) {
      this.userService.update(user).subscribe(
        (response) => {
          Object.assign(this.user, response);
          this.router.navigate(['/user/profile']);
          this.toastService.success('You successfully updated your profile!');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
