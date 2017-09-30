import { Component, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChangePasswordModal } from '../change-password/change-password.modal';
import { UserService } from '../../user/user.service';
import { WorkerService } from '../../worker/worker.service';
import { EmployerService } from '../../employer/employer.service';
import { User } from '../../user/User';

@Component({
  moduleId: module.id,
  selector: 'app-drop-down-menu',
  templateUrl: 'drop-down-menu.component.html',
  styleUrls: ['drop-down-menu.component.css']
})

export class DropDownMenuComponent {
  show: boolean = false;
  user: User;

  constructor(private userService: UserService, private employerService: EmployerService,
    private workerService: WorkerService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      (user) => { this.user = user; }
    );
  }

  openPasswordModal() {
    let modal = this.modalService.open(ChangePasswordModal);

    modal.result.then(
      (result) => { },
      (reason) => { }
    );
  }

  logOut() {
    this.userService.logOut();
    this.user.type === 'employer' ? this.employerService.logOut() : this.workerService.logOut();
  }
}
