import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../User/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  private username: string = '';
  private password: string = '';
  private resetForm: boolean = false;

  constructor(private router: Router, private userService: UserService) {
  }

  login (): void {
    this.userService.authorize('bar', 'barsecret').subscribe((result: any) => { console.log(result); });
    this.router.navigate(['user/profile']);
  }

  resetPassword(): void {
  }
}
