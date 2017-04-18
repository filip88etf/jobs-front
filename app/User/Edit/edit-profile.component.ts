import { Component, OnInit } from '@angular/core';

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

  constructor(private userService: UserService) {
  }

  ngOnInit () {
    this.user = this.userService.getUser();
  }

  editSave() {
  }
}
