import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { User } from '../../User/User';
import { UserService } from '../../User/user.service';
import { CITIES, PROFESSIONS } from '../../global-consts';

@Component({
  moduleId: module.id,
  selector: 'app-user-menu',
  templateUrl: 'user-menu.component.html',
  styleUrls: ['user-menu.component.css']
})

export class UserMenuComponent implements OnInit {
  active: number = 1;
  user: User;
  userRoute: Route;
  jobsRoute: Route;
  searchRoute: Route;
  isLogged: boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    let path = this.router['location'].path();
    this.active = path.indexOf('profile/jobs') !== -1 ? 2 : 1;
    this.active = path.indexOf('workers') !== -1 ? 3 : this.active;
    this.active = path.indexOf('jobs;') !== -1 ? 4 : this.active;
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
    this.active = 1;
  }

  public jobs() {
    this.router.navigate(['/' + this.user.type + '/profile/jobs']);
    this.active = 2;
  }

  public searchWorkers() {
    this.router.navigate(['/workers', { profession: PROFESSIONS[0].value, region: CITIES[0].value , page: 1 }]);
    this.active = 3;
  }

  public loggedSearchJobs() {
    if (this.user.type === 'worker') {
      this.router.navigate(['/jobs', { profession: this.user['profession'], region: this.user['region'][0], page: 1 }]);
      this.active = 4;
    } else {
      this.searchJobs();
    }
  }

  public searchJobs() {
    this.router.navigate(['/jobs', { profession: PROFESSIONS[0].value, region: CITIES[0].value, page: 1 }]);
    this.active = 4;
  }
}
