import { Component, OnInit } from '@angular/core';

import { User } from '../User';

@Component({
  moduleId: module.id,
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  user: User;
  ngOnInit () {
    this.user = new User();
  }
}
