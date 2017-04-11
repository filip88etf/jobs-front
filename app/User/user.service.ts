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

  authorize(username: string, password: string): any {
    let headers = new Headers();
    let data = {
      grant_type: 'password',
      client_id: 'foo',
      client_secret: 'foosecret',
      username: 'bar',
      password: 'barsecret'
    };

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic Zm9vOmZvb3NlY3JldA==');
    let options = new RequestOptions(
    {
      headers: headers
    });
    return this.http.post('https://jobsy-kp-api.herokuapp.com/oauth/token', 'grant_type=password&client_id=foo&client_secret=foosecret&username=bar&password=barsecret', options)
      .map(
        function success(response: Response): any {
          return response.json();
        }
      )
      .catch(function fail(error: Response): any {
        console.log('fail auth start');
        console.log(error.json());
        console.log('fail auth end');
        return 'filip';
      });
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
