import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user: User) => {
        this.user = user;
        console.log(this.user);
      }
    );
  }

  hideProfile(hide: boolean): void {
    console.log('Profile is hidden');
  }
}
