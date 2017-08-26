import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User } from '../../user/User';
import { UserService } from '../../user/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-employer-details',
  templateUrl: 'employer-details.component.html',
  styleUrls: ['employer-details.component.css']
})

export class EmployerDetailsComponent implements OnInit {
  employer: User;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userService.getByUsername(params['username']).subscribe(
        (user: User) => {
          this.employer = user;
          console.log(this.employer);
        }
      );
    });
  }
}
