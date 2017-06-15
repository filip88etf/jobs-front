import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, InitParams, LoginOptions } from 'ngx-facebook';

import { UserService } from '../../User/user.service';
import { AuthorizationService } from '../../Core/Services/authorization.service';

@Component({
  moduleId: module.id,
  selector: 'app-facebook-signup',
  templateUrl: 'facebook-signup.component.html',
  styles: ['.facebook-button-signup{overflow: hidden;text-overflow: ellipsis; background-color: #3B5998; width: 100%;}']
})

export class FacebookSignupComponent implements OnInit {

  constructor(private facebookService: FacebookService, private router: Router,
    private userService: UserService, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.facebookService.init({
      appId      : '1490087824391764',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  signup() {
    this.facebookService.login({scope: 'public_profile'})
      .then(
        (response: any) => {
          localStorage.setItem('facebookAccessToken', response.authResponse.accessToken);
          this.userService.doesExist(response.authResponse.userID, 'username').subscribe(
            (exist: boolean) => {
              if (exist) {
                this.authorizeAndLogin(response);
              } else {
                this.getDataFromFacebook();
              }
            });
      })
      .catch(
        (error: any) => {
          console.log(error);
      });
  }

  private getDataFromFacebook(): void {
    this.facebookService.api('/me', 'get', { fields: 'last_name,first_name,email,gender,picture'})
    .then(
      (user: any) => {
        this.mapFacebookResponse(user);
        this.router.navigate(['/user/signup/facebook_role']);
      }
    )
    .catch(
      (error: any) => {
        console.log(error);
      }
    );
  }

  private authorizeAndLogin(facebookData: Object): void {
    let username = facebookData['authResponse'].userID,
        facebookAccessToken = facebookData['authResponse'].accessToken;

    this.authorizationService.authorizeWithFacebook(username, facebookAccessToken).subscribe(
      (result: any) => {
        this.userService.getByUsername(username).subscribe(
          (user: any) => { this.router.navigate([user.type + '/profile']); },
          (error: any) => { console.log(error); }
        );
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  private mapFacebookResponse(response: Object): void {
    let user: Object = {};

    for (let property in response) {
      switch (property) {
        case 'picture':
          user['imageURL'] = response[property].data.url;
          break;
        case 'first_name':
          user['firstName'] = response[property];
          break;
        case 'last_name':
          user['lastName'] = response[property];
          break;
        case 'id':
          user['fbId'] = response[property];
          user['username'] = response[property];
          break;
        default:
          user[property] = response[property];
      }
    }
    this.userService.updateUser(user);
  }
}
