import { Component, ViewChild } from '@angular/core';

import { ChangePasswordComponent } from '../ChangePassword/change-password.component';
import { UserService } from '../user.service';
import { WorkerService } from '../../Worker/worker.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-user-menu',
  templateUrl: 'user-menu.component.html',
})

export class UserMenuComponent {
  show: boolean = false;

  constructor(private userService: UserService, private workerService: WorkerService, private modalService: NgbModal) {
  }

  openPasswordModal() {
    let modal = this.modalService.open(ChangePasswordComponent);
    modal.result.then(
      (result) => { console.log('result = ' + result); },
      (reason) => { console.log('reason = ' + reason); }
    );
  }

  logOut() {
    this.userService.logOut();
    this.workerService.logOut();
  }
}
