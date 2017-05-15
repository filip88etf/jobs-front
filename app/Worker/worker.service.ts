import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Worker } from './Worker';
import { BaseService } from '../base.service';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class WorkerService extends BaseService<Worker> {
  worker: Worker;

  constructor(private http: Http, authorizationService: AuthorizationService, router: Router) {
    super('workers', http, authorizationService, router);
  }

  getByUserId(userId: string): Observable<Worker> {
    let routeUrl = this.apiUrl + '/' + 'search/findByUserId?user_id=' + userId;

    return this.http.get(routeUrl, this.options)
      .map(
        (response: any) => {
          this.worker = new Worker();
          Object.assign(this.worker, response.json());
          return this.worker;
        }
      )
      .catch(
        (error: any) => { return this.errorHandler(error); }
      );
  }

  getWorker(userId: string): Observable<Worker> {
    if (!this.worker) {
      return this.getByUserId(userId);
    }
    return Observable.of(this.worker);
  }

  logOut() {
    this.worker = null;
  }
}
