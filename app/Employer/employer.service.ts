import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Employer } from './Employer';
import { BaseService } from '../Core/Services/base.service';
import { AuthorizationService } from '../Core/Services/authorization.service';
import { NotificationService } from '../Core/Services/notification.service';

@Injectable()

export class EmployerService extends BaseService<Employer> {
  private employer: Employer;

  constructor(private http: Http, authorizationService: AuthorizationService,
    notificationService: NotificationService, router: Router) {
    super('employers', http, authorizationService, notificationService, router);
  }

  getEmployer(): Observable<Employer> {
    if (!this.options) { this.initOptions(); }
    if (!this.employer) {
      return this.getByUsername(localStorage.getItem('username'));
    }
    return Observable.of(this.employer);
  }

  getByUsername(username: string): Observable<Employer> {
    let routeUrl = '/search/findByUsername?username=' + username;
    this.initOptions();

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        function success(response: Response): any {
          this.employer = this.employer || new Employer();
          Object.assign(this.employer, response.json());
          localStorage.setItem('username', this.employer.username);
          return this.employer;
      }.bind(this))
      .catch(
        function fail(error: any): any {
          return this.errorHandler(error);
        }.bind(this)
      );
  }

  create(user: Employer): Observable<Employer> {
    let options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/json'}) });

    return this.http.post(this.apiUrl, user, options)
      .map(
        function success(response: Response): any {
          return response.json();
      })
      .catch(
        function fail(error: any): any {
          return this.errorHandler(error);
        }.bind(this)
      );
  }

  uploadProfilePicture(picture: any): Observable<boolean> {
    let routeUrl = '/profile/image?username=' + this.employer.username;

    this.notificationService.startLoading();
    return this.http.post(this.apiUrl + routeUrl, picture, this.options)
      .map(
        function success(response: any): boolean {
          this.notificationService.stopLoading();
          return response['_body'];
        }.bind(this)
      )
      .catch(
        function fail(error: any): any {
          this.notificationService.stopLoading();
          return this.errorHandler(error);
        }
      );
  }

  logOut() {
    this.employer = null;
    this.clearStorage();
    this.router.navigate(['/user/login']);
  }

  setEmployer(employer: Employer) {
    this.employer = employer;
  }
}
