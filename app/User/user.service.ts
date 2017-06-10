import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from './User';
import { BaseService } from '../Core/Services/base.service';
import { AuthorizationService } from '../Core/Services/authorization.service';

@Injectable()
export class UserService extends BaseService<User> {
  private user: User;

  constructor (private http: Http, authorizationService: AuthorizationService, router: Router) {
    super('users', http, authorizationService, router);
  }

  getByUsername(username: string): Observable<User> {
    let routeUrl = '/search/findByUsername?username=' + username;
    this.initOptions();

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        function success(response: Response): any {
          this.user = this.user || new User();
          Object.assign(this.user, response.json());
          localStorage.setItem('username', this.user.username);
          return this.user;
      }.bind(this))
      .catch(
        function fail(error: any): any {
          return this.errorHandler(error);
        }.bind(this)
      );
  }

  logOut() {
    this.user = null;
    this.clearStorage();
    this.router.navigate(['/user/login']);
  }

  getUser(): Observable<User> {
    if (!this.user) {
      return this.getByUsername(localStorage.getItem('username'));
    }
    return Observable.of(this.user);
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.apiUrl)
      .map(
        function success(response: Response) {
          return [new User()];
      })
      .catch(
        function fail(error: any) {
          return this.errorHandler(error);
        }.bind(this)
      );
  }

  create(user: User): Observable<User> {
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

  verifyPassword(password: string): Observable<boolean> {
    let routeUrl = this.apiUrl + '/verify',
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
    return this.http.patch(this.apiUrl + '/' + this.user.id, {password: newPassword}, this.options)
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
        routeUrl = '/reset',
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
    let routeUrl = '/search/existsBy' + field[0].toUpperCase() + field.slice(1) + '?' + field + '=' + value;

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

  uploadProfilePicture(picture: any): Observable<boolean> {
    let routeUrl = '/profile/image?username=' + this.user.username;

    return this.http.post(this.apiUrl + routeUrl, picture, this.options)
      .map(
        function success(response: any): boolean {
          return response['_body'];
        }.bind(this)
      )
      .catch(
        function fail(error: any): any {
          return this.errorHandler(error);
        }
      );
  }

  updateUser(object: Object): void {
    this.user = this.user || new User();

    for (let property in object) {
      this.user[property] = object[property];
    }

    localStorage.setItem('username', this.user.username);
  }
}
