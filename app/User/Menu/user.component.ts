import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})

export class UserMenuComponent implements OnInit {
  active: number = 1;
  userRoute: string[];
  jobsRoute: string[];

  constructor(private router: Router) {
    this.active = this.router['location'].path() === '/user/profile' ? 1 : 2;
  }

  ngOnInit() {
    let userType  = this.router['currentRouterState'].snapshot.url.split('/')[1];

    this.userRoute = ['/' + userType + '/profile'];
    this.jobsRoute = ['/' + userType + '/profile/jobs'];
  }
}
