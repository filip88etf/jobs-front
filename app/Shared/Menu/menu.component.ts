import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../User/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})

export class MenuComponent {

  constructor(private userService: UserService, private router: Router) {
  }

  public login() {
    this.userService.isLogged().subscribe((response) => {
      if (response) {
        this.userService.getUser().subscribe(
          (user: any) => { this.router.navigate([user.type + '/profile']); },
          (error: any) => { this.router.navigate(['user/login']); }
        );
      } else {
        this.router.navigate(['user/login']);
      }
    });
  }
}
