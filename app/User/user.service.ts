import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './User';
import { BaseService } from '../base-service';

@Injectable()
export class UserService extends BaseService<User> {
  private user: User;

  constructor (private http: Http) {
    super('users', http);
    console.log('UserService constructor is executed');
  }

  getByUsername(username: string) {
    let routeUrl = '/search/findByUsername?username=' + username;

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        function success(response: Response): any {
          return response.json();
      }.bind(this))
      .catch(
        function fail(error): any {
          console.error(error);
      });
  }

  getUser(): User {
    return this.user;
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.apiUrl).map(function success() {
      return [new User()];
    });
  }

  create(user: User): Observable<User> {
    return this.http.post(this.apiUrl, user, this.options)
      .map(
        function success(response: Response): any {
          return response.json();
      })
      .catch(
        function fail(error: Response): any {
          console.error(error);
      });
  }
}
