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
          console.log(response);
          ;
      })
      .catch(
        function fail(error: Response): any {
      });
  }
  update() {}
  delete() {}

  getJobs() {
    return [
      {
        region: 'Belgrade',
        profession: 'Electrician',
        description: 'Electrician to fix my garage door. Urgently!!',
        createdDate: '12.03.2013'
      },
      {
        region: 'Belgrade',
        profession: 'Gardener',
        description: 'Gardener! Mowing the my back yard.',
        createdDate: '02.10.2012'
      },
      {
        region: 'Belgrade',
        profession: 'Housekeeper',
        description: 'I need housekeeper, for cleaning, ironing, cooking..',
        createdDate: '01.08.2012'
      }
    ];
  }
}
