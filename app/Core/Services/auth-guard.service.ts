import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { AuthorizationService } from './authorization.service';

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(private authorizationService: AuthorizationService, private router: Router) {
  }

  canActivate(state: ActivatedRouteSnapshot): boolean {
    let isAuthorized = this.authorizationService.isAuthorized();

    if (!isAuthorized) {
      this.router.navigate(['user/login']);
    }

    return isAuthorized;
  }
}
