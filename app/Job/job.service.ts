import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Job } from './Job';
import { BaseService } from '../base-service';

@Injectable()
export class JobService extends BaseService<Job> {

  constructor (private http: Http) {
    super('jobs', http);
  }

  getByUserId(userId: string) {
    let routeUrl = '/search/findByUserId?userId=' + userId;

    return this.http.get(this.apiUrl + routeUrl, this.options).map(
      function success (response: Response) {
        return response.json().content;
      })
    .catch(
      function fail (error: any) {
        console.error(error.json());
        return Observable.throw(error.json());
      }
    );
  }
}
