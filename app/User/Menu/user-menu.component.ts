import { Component, ViewChild } from '@angular/core';

import { ChangePasswordComponent } from '../ChangePassword/change-password.component';
import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-menu',
  templateUrl: 'user-menu.component.html',
})

export class UserMenuComponent {
  show: boolean = false;
  @ViewChild(ChangePasswordComponent) public passwordModal: ChangePasswordComponent;

  constructor(private userService: UserService) {
  }

  openPasswordModal() {
    this.passwordModal.open();
  }

  logOut() {
    this.userService.logOut();
  }
}
