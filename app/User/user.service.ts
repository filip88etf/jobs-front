import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './User';

@Injectable()
export class UserService {
  private baseUrl: string = 'http://jobsy-kp-api.herokuapp.com/users';

  constructor (private http: Http) {
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.baseUrl).map(function success() {
      console.log('aaa');
      return [new User()];
    });
  }

  create(user: User): Observable<User> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions(
      {
        headers: headers,
        url: this.baseUrl
      });

    return this.http.post(this.baseUrl, user, options)
      .map(
        function success(response: Response): any {
          console.error(response);
          return response.json();
      })
      .catch(
        function fail(error: Response): any {
          console.log('fail start');
          console.error(error);
          console.log('fail end');
      });
  }
  update() {}
  delete() {}
}
