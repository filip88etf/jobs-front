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
  private resetForm: boolean = false;

  constructor(private router: Router, private userService: UserService,
    private authorizationSerivce: AuthorizationService) {
  }

  login (): void {
    this.authorizationSerivce.authorize('bar', 'barsecret').subscribe(
      function authorizeSuccess (result: any) {
        this.userService.getByUsername('sdfasd').subscribe(
          function getSuccess (result: any) {
            console.log('aaaa');
          },
          function getFail (result: any) {
            console.log('bbbb');
          }
        );
        console.log(result);
      }.bind(this),
      function fail (result: any) {
        console.log(result);
      }
    );
    this.router.navigate(['user/profile']);
  }

  resetPassword(): void {
  }
}
