import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './User';

@Injectable()
export class UserService {
  private baseUrl: string = 'https://jobsy-kp-api.herokuapp.com/users';

  constructor (private http: Http) {
  }

  getByUsername(username: string) {
    let routeUrl = '/search/findByUsername?username=' + 'bar';
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseUrl + routeUrl, options)
      .map(
        function success(response: Response): any {
          return response.json();
      })
      .catch(
        function fail(error): any {
          console.error(error);
      });
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.baseUrl).map(function success() {
      return [new User()];
    });
  }

  create(user: User): Observable<User> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl, user, options)
      .map(
        function success(response: Response): any {
          return response.json();
      })
      .catch(
        function fail(error: Response): any {
          console.error(error);
      });
  }

  update() {}

  delete() {}
}
