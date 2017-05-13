import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { User } from '../User';
import { GENDER_LIST } from '../../global-consts';
import { Option } from '../../global-types';
import { UserService } from '../user.service';

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
  constructor(private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit () {
    this.userService.getUser().subscribe(
      (response) => { this.user = response; },
      (error) => { console.log(error); }
    );
    this.editForm = this.formBuilder.group({
      
    });
  }

  editSave() {

  }
}
