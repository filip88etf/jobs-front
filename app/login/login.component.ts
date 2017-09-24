import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, InitParams, LoginOptions } from 'ngx-facebook';

import { UserService } from '../user/user.service';
import { AuthorizationService } from '../core/services/authorization.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  private username: string = '';
  private password: string = '';
  private badCredentials: boolean = false;
  private noFacebookAccount = false;

  constructor(private router: Router, private userService: UserService, private facebookService: FacebookService,
    private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.facebookService.init({
      appId      : '1490087824391764',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
  }

  login (): void {
    this.badCredentials = false;
    this.authorizationService.authorize(this.username, this.password).subscribe(
      (result: any) => {
        this.userService.getCurrentByUsername(this.username).subscribe(
          (user: any) => { this.router.navigate([user.type + '/profile']); },
          (error: any) => { console.log(error); }
        );
      },
      (error: any) => {
        if (error.status === 400) {
          this.badCredentials = true;
        }
      }
    );
  }

  loginWithFacebook(): void {
    this.facebookService.login({scope: 'public_profile'})
      .then(
        (response: any) => {
          localStorage.setItem('facebookAccessToken', response.authResponse.accessToken);
          this.authorizeAndLogin(response);
      })
      .catch(
        (error: any) => {
          console.log(error);
      });
  }

  private authorizeAndLogin(facebookData: Object): void {
    let username = facebookData['authResponse'].userID,
        facebookAccessToken = facebookData['authResponse'].accessToken;

    this.authorizationService.authorizeWithFacebook(username, facebookAccessToken).subscribe(
      (result: any) => {
        this.userService.getCurrentByUsername(username).subscribe(
          (user: any) => {
            if (user) {
              this.router.navigate([user.type + '/profile']);
            } else {
              this.noFacebookAccount = true;
            }
          },
          (error: any) => {
            this.noFacebookAccount = true;
          }
        );
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
