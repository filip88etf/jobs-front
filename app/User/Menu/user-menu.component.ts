import { Component, ViewChild } from '@angular/core';

import { ChangePasswordComponent } from '../ChangePassword/change-password.component';
import { UserService } from '../user.service';
import { WorkerService } from '../../Worker/worker.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-menu',
  templateUrl: 'user-menu.component.html',
})

export class UserMenuComponent {
  show: boolean = false;
  @ViewChild(ChangePasswordComponent) public passwordModal: ChangePasswordComponent;

  constructor(private userService: UserService, private workerService: WorkerService) {
  }

  openPasswordModal() {
    this.passwordModal.open();
  }

  logOut() {
    this.userService.logOut();
    this.workerService.logOut();
  }
}
