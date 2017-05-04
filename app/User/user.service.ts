import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from './User';
import { BaseService } from '../base-service';

@Injectable()
export class UserService extends BaseService<User> {
  private user: User;

  constructor (private http: Http) {
    super('users', http);
    console.log('UserService constructor is executed');
  }

  getByUsername(username: string): Observable<User> {
    let routeUrl = '/search/findByUsername?username=' + username;
    this.initOptions();

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        function success(response: Response): any {
          this.user = new User();
          Object.assign(this.user, response.json());
          localStorage.setItem('username', this.user.username);
          return this.user;
      }.bind(this))
      .catch(
        function fail(error): any {
          console.error(error);
      });
  }

  getUser(): Observable<User> {
    if (!this.user) {
      return this.getByUsername(localStorage.getItem('username'));
    }
    return Observable.of(this.user);
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.apiUrl).map(function success() {
      return [new User()];
    });
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
          console.error(error);
      });
  }

  verifyPassword(password: string): Observable<boolean> {
    let data = {
      username: this.user.username,
      password: password
    };

    return this.http.post(this.apiUrl, data, this.options)
      .map(
        function success(response: Response): any {
          console.log(response.json());
        }
      )
      .catch(
        function fail(error: any): any{
          console.error(error);
        }
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
          return false;
        }
      );
  }
}
