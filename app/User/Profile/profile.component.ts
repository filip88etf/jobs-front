import { Component, OnInit } from '@angular/core';

import { User } from '../User';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User;

  ngOnInit() {
    this.user = new User();
    this.user.firstName = 'Filip';
    this.user.lastName = 'Djordjevic';
    this.user.gender = 'Male';
    this.user.phone = '0601434835';
    this.user.email = 'eing.filip@gmail.com';
    this.user.birth = '06 Aug 1988';
    this.user.username = 'ficko';
  }
}
