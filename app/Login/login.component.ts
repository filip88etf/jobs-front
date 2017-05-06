import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../User/user.service';
import { AuthorizationService } from '../authorization.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  private username: string = '';
  private password: string = '';
  private badCredentials: boolean = false;

  constructor(private router: Router, private userService: UserService,
    private authorizationSerivce: AuthorizationService) {
  }

  login (): void {
    this.badCredentials = false;
    this.authorizationSerivce.authorize(this.username, this.password).subscribe(
      function authorizeSuccess (result: any) {
        console.log('authorizeSuccess');
        this.userService.getByUsername(this.username).subscribe(
          (result: any) => { this.router.navigate(['user/profile']); },
          (error: any) => { console.log('error in getByUsername'); }
        );
      }.bind(this),
      function authorizeFail (error: any) {
        if (error.status === 400) {
          this.badCredentials = true;
        }
      }.bind(this)
    );
  }

  resetPassword(): void {
  }
}
