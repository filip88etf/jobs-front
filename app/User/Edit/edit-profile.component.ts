import { Component, OnInit } from '@angular/core';

import { User } from '../User';
import { GENDER_LIST, Option } from '../../global-consts';

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
  ngOnInit () {
    this.user = new User();
  }
}
