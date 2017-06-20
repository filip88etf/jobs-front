import { Component, ViewChild, Input } from '@angular/core';

import { ChangePasswordComponent } from '../ChangePassword/change-password.component';
import { UserService } from '../user.service';
import { WorkerService } from '../../Worker/worker.service';
import { EmployerService } from '../../Employer/employer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../User';

@Component({
  moduleId: module.id,
  selector: 'app-drop-down-menu',
  templateUrl: 'drop-down-menu.component.html',
  styles: ['.caret-style {color: white; display: block; margin: -4px 0px; padding: 0px 9px}']
})

export class DropDownMenuComponent {
  show: boolean = false;
  user: User;

  constructor(private userService: UserService, private employerService: EmployerService,
    private workerService: WorkerService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user) => { this.user = user; }
    );
  }

  openPasswordModal() {
    let modal = this.modalService.open(ChangePasswordComponent);

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
