import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { User } from '../../user/User';
import { UserService } from '../../user/user.service';
import { CITIES, PROFESSIONS } from '../../global-consts';

const NOACTIVE = -1, PROFILE = 1, YOURJOBS = 2, WORKERS = 3, JOBS = 4;

@Component({
  moduleId: module.id,
  selector: 'app-user-menu',
  templateUrl: 'user-menu.component.html',
  styleUrls: ['user-menu.component.css']
})

export class UserMenuComponent implements OnInit {
  private active: number = -1;
  private user: User;
  private userRoute: Route;
  private jobsRoute: Route;
  private searchRoute: Route;
  private isLogged: boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    let path = this.router['location'].path();
    if (path.indexOf('employer/jobs') !== -1 || path.indexOf('worker/jobs') !== -1) {
      this.active = YOURJOBS;
    } else {
      this.active = path.indexOf('jobs;') !== -1 ? JOBS : this.active;
    }
    this.active = path.indexOf('workers;') !== -1 ? WORKERS : this.active;
    this.active = path.indexOf('/profile') !== -1 ? PROFILE : this.active;
    if (!(path.indexOf('employer/jobs') !== -1 || path.indexOf('worker/jobs') !== -1 ||
      path.indexOf('workers') !== -1 || path.indexOf('/profile') !== -1 || path.indexOf('jobs;') !== -1)) {
        this.active = NOACTIVE;
    }
  }

  ngOnInit() {
    this.userService.isLogged().subscribe(
      (user: any) => {
        this.isLogged = !!user;
        this.user = user;
      },
      (error: any) => { this.isLogged = false; }
    );
  }

  public profile() {
    this.router.navigate(['/' + this.user.type + '/profile']);
    this.active = PROFILE;
  }

  public jobs() {
    this.router.navigate(['/' + this.user.type + '/jobs', {page: 1}]);
    this.active = YOURJOBS;
  }

  public searchWorkers() {
    this.router.navigate(['/workers', { profession: PROFESSIONS[0].value, region: CITIES[0].value , page: 1 }]);
    this.active = WORKERS;
  }

  public loggedSearchJobs() {
    if (this.user.type === 'worker') {
      this.router.navigate(['/jobs', { profession: this.user['profession'], region: this.user['region'][0], page: 1 }]);
      this.active = JOBS;
    } else {
      this.searchJobs();
    }
  }

  public searchJobs() {
    this.router.navigate(['/jobs', { profession: PROFESSIONS[0].value, region: CITIES[0].value, page: 1 }]);
    this.active = JOBS;
  }
}
