import { Component, ViewChild } from '@angular/core';

import { ChangePasswordComponent } from '../ChangePassword/change-password.component';

@Component({
  moduleId: module.id,
  selector: 'app-user-menu',
  templateUrl: 'user-menu.component.html',
})

export class UserMenuComponent {
  show: boolean = false;
  @ViewChild(ChangePasswordComponent) public passwordModal: ChangePasswordComponent;

  openPasswordModal() {
    this.passwordModal.open();
  }
}
