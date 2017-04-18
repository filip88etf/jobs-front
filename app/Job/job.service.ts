import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Job } from './Job';
import { BaseService } from '../base-service';

@Injectable()
export class JobService extends BaseService {

  constructor (private http: Http) {
    super('jobs');
  }

  getByUserId(userId: string) {
    let routeUrl = '/search/findByUserId?userId=' + userId;

    return this.http.get(this.apiUrl, this.options).map(
      function success (response: Response) {
        return response.json();
      })
    .catch(
      function fail (error: any) {
        console.error(error.json());
        return Observable.throw(error.json());
      }
    );
  }

  create(job: Job): Observable<Job> {
    return this.http.post(this.apiUrl, job, this.options).map(
      function success (response: Response) {
        return response.json();
      })
    .catch(
      function fail (error: any) {
        console.error(error.json());
        return Observable.throw(error.json());
      }
    );
  }

  update(job: Job): Observable<Job> {
    return this.http.put(this.apiUrl, job, this.options).map(
      function success (response: Response) {
        return response.json();
      })
    .catch(
      function fail (error: any) {
        console.error(error.json());
        return Observable.throw(error.json());
      }
    );
  }

  getJobs(userId: string): Observable<Job[]> {
    return this.http.get(this.apiUrl).map(
      function success (response: Response) {
        return response.json();
      })
    .catch(
      function fail (error: Response) {
        console.error(error.json());
        return Observable.throw(error.json());
      }
    );
  }
}
