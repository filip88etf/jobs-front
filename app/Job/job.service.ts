import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Job } from './Job';

@Injectable()
export class JobService {
  private baseUrl: string = 'http://jobsy-kp-api.herokuapp.com/jobs';

  constructor (private http: Http) {
  }

  create(job: Job): Observable<Job> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions(
      {
        headers: headers,
        url: this.baseUrl
      });

    return this.http.post(this.baseUrl, job, headers).map(
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
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions(
      {
        headers: headers,
        url: this.baseUrl
      });

    return this.http.put(this.baseUrl, job, headers).map(
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
    return this.http.get('').map(
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
