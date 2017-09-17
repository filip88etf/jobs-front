import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Job } from './Job';
import { BaseService } from '../core/services/base.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { NotificationService } from '../core/services/notification.service';

@Injectable()
export class JobService extends BaseService<Job> {

  constructor (private http: Http, authorizationService: AuthorizationService,
    notificationService: NotificationService, router: Router) {
    super('jobs', http, authorizationService, notificationService, router);
  }

  public create(entity: Job): Observable<Job> {
    return this.httpService.post(this.apiUrl, entity, this.options)
      .map(
        (response: Response) => {
          return response.json();
        })
      .catch(
        (error: Error) => {
          return this.errorHandler(error);
        }
      );
  }

  public getEmployerJobs(params: any) {
    let stringParams = 'username=' + params.username + '&page=' + params.page + '&size=' + this.pageSize;
    let routeUrl = '/search/findByUsername?' + stringParams;
    if (!this.options) { this.initOptions(); }

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        (response: Response) => {
          return response.json();
        })
      .catch(
        (error: any) => {
          return this.errorHandler(error);
        }
      );
  }

  public getWorkerJobs(params: any) {
    let stringParams = 'username=' + params.username + '&page=' + params.page + '&size=' + this.pageSize;
    let routeUrl = '/search/findByUsername?' + stringParams;
    if (!this.options) { this.initOptions(); }

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        (response: Response) => {
          return response.json();
        })
      .catch(
        (error: any) => {
          return this.errorHandler(error);
        }
      );
  }

  public uploadPicture(picture: any, jobId: string): Observable<boolean> {
    let routeUrl = '/image?id=' + jobId;

    return this.http.post(this.apiUrl + routeUrl, picture, this.options)
      .map(
        (response: any) => {
          this.notificationService.stopLoading();
          return response['_body'];
        }
      )
      .catch(
        (error: any) => {
          this.notificationService.stopLoading();
          return this.errorHandler(error);
        }
      );
  }

  public getAppliedJobs(applications: any[], page: number): Observable<Job[]> {
    let ids: string[] = [];

    for (let i = 0; i < applications.length; i++) {
      ids.push(applications[i].jobId);
    }

    return this.fetch(ids, page);
  }
}
