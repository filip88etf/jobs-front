import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { User } from '../User';
import { UserService } from '../user.service';
import { WorkerService } from '../../Worker/worker.service';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User;
  worker: Worker;

  constructor(private userService: UserService, private workerService: WorkerService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user: User) => {
        this.user = user;
        if (user.userType === 'worker') {
          this.workerService.getWorker(user.id).subscribe(
            (value: any) => { this.worker = value; },
            (error: any) => { console.log(error); }
          );
        }
      }
    );
  }

  hideProfile(hide: boolean): void {
    console.log('Profile is hidden');
  }
}
