import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  goToEdit() {
    this.router.navigate([this.user.type + '/profile/edit']);
  }

  hideProfile(hide: boolean): void {
  }
}
