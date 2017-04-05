import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-jobs',
  templateUrl: 'user-jobs.component.html'
})

export class UserJobsComponent implements OnInit {

  constructor (private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getJobs();
  }
}
