import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from './User';
import { Worker } from '../worker/Worker';
import { Employer } from '../employer/Employer';
import { BaseService } from '../core/services/base.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { EmployerService } from '../employer/employer.service';
import { WorkerService } from '../worker/worker.service';
import { NotificationService } from '../core/services/notification.service';

@Injectable()
export class UserService extends BaseService<User> {
  private user: User;

  constructor (private http: Http, authorizationService: AuthorizationService, router: Router,
    notificationService: NotificationService, private employerService: EmployerService,
    private workerService: WorkerService) {
    super('', http, authorizationService, notificationService, router);
  }

  getCurrentUser(): Observable<User> {
    if (!this.user) {
      return this.getCurrentByUsername(localStorage.getItem('username'));
    }
    return Observable.of(this.user);
  }

  getCurrentByUsername(username: string): Observable<User> {
    let routeUrl = '/users/findByUsername?username=' + username;
    this.initOptions();

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        function success(response: Response): any {
          let user = response.json();

          if (user.type === 'worker') {
            this.user = Object.assign(new Worker(), user);
            this.workerService.setWorker(this.user);
          } else {
            this.user = Object.assign(new Employer(), user);
            this.employerService.setEmployer(this.user);
          }

          localStorage.setItem('username', this.user.username);
          return this.user;
      }.bind(this))
      .catch(
        function fail(error: any): any {
          return this.errorHandler(error);
        }.bind(this)
      );
  }

  public getDetails(username: string): Observable<User> {
    let routeUrl = '/users/details/findByUsername?username=' + username;

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        (response: Response) => {
          let user = response.json();

          user = Object.assign(user.type === 'worker' ? new Worker() : new Employer(), user);
          return user;
      })
      .catch(
        function fail(error: any): any {
          console.log(error);
        }
      );
  }

  setUser(user: User): void {
    this.user = user;
  }

  verifyPassword(password: string): Observable<boolean> {
    let routeUrl = this.apiUrl + '/users/verify',
        data = {
          username: this.user.username,
          password: password
        };

    return this.http.post(routeUrl, data, this.options)
      .map(
        function success(response: Response): any {
          return response.json();
        }
      )
      .catch(
        function fail(error: any): any{
          return this.errorHandler(error);
        }.bind(this)
      );
  }

  changePassword(newPassword: string): Observable<boolean> {
    let data = {password: newPassword},
        url = this.apiUrl + '/' + this.user.type + 's/' + this.user.id;

    return this.http.patch(url, data, this.options)
      .map(
        function success(response: Response): any {
          return true;
        }
      )
      .catch(
        function fail(error: any): any {
          return this.errorHandler(error);
        }.bind(this)
      );
  }

  resetPassword(email: string): Observable<boolean> {
    let options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/json'}) }),
        routeUrl = '/users/reset',
        data = { email: email};

    return this.http.post(this.apiUrl + routeUrl, data, options)
      .map(
        function success(response: Response): any {
          return response.json();
        }
      )
      .catch(
        function fail(error: any): any {
          return Observable.throw(error);
        }
      );
  }

  doesExist(value: any, field: string): Observable<boolean> {
    let routeUrl = '/users/existsBy' + field[0].toUpperCase() + field.slice(1) + '?' + field + '=' + value;

    return this.http.get(this.apiUrl + routeUrl)
      .map(
        function success(response): boolean {
          return response.json();
        }
      )
      .catch(
        function fail(error: any): any {
          return this.errorHandler(error);
        }
      );
  }

  updateUser(object: Object): void {
    this.user = this.user || new User('');

    for (let property in object) {
      this.user[property] = object[property];
    }

    localStorage.setItem('username', this.user.username);
  }

  tryGetUser(username: string): Observable<User> {
    let routeUrl = '/users/findByUsername?username=' + username;
    this.initOptions();

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        function success(response: Response): any {
          let user = response.json();

          if (user.type === 'worker') {
            this.user = Object.assign(new Worker(), user);
            this.workerService.setWorker(this.user);
          } else {
            this.user = Object.assign(new Employer(), user);
            this.employerService.setEmployer(this.user);
          }

          localStorage.setItem('username', this.user.username);
          return this.user;
      }.bind(this))
      .catch(
        function fail(error: any): any {
          return Observable.of(false);
        }.bind(this)
      );
  }

  isLogged(username: string = ''): Observable<Object> {
    username = username || localStorage.getItem('username');
    if (!username || !localStorage.getItem('accessToken')) {
        return Observable.of(false);
    }
    if (this.user) {
      return Observable.of(this.user);
    }
    return this.tryGetUser(username);
  }

  logOut(): void {
    this.user = null;
  }
}
