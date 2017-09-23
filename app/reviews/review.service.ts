import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { BaseService } from '../core/services/base.service';
import { Review } from './Review';
import { AuthorizationService } from '../core/services/authorization.service';
import { NotificationService } from '../core/services/notification.service';

@Injectable()

export class ReviewService extends BaseService<Review> {
  constructor (private http: Http, authorizationService: AuthorizationService,
    notificationService: NotificationService, router: Router) {
    super('', http, authorizationService, notificationService, router);
  }

  public createReviews(reviews: Object[]): Observable<Review[]> {
    let routeUrl = this.apiUrl + '/workers/reviews/bulk';
    if (!this.options) this.initOptions();

    return this.httpService.post(routeUrl, reviews, this.options).map(
      (response) => {
        return response.json();
      }
    ).catch(
      (error: any) => {
        return this.errorHandler(error, false);
      }
    );
  }

  public getWorkerReviews(params: Object): Observable<Review[]> {
    let routeUrl = this.apiUrl + '/workers/reviews?' + this.encodeUrl(params) + '&size=' + this.pageSize;
    if (!this.options) this.initOptions();

    return this.httpService.get(routeUrl, this.options).map(
      (response) => {
        return response.json();
      }
    ).catch(
      (error: any) => {
        return this.errorHandler(error, false);
      }
    );
  }

  public getEmployerReviews(username: string): Observable<Review[]> {
    let routeUrl = this.apiUrl + '/employers/reviews?username=' + username;
    if (!this.options) this.initOptions();

    return this.httpService.get(routeUrl, this.options).map(
      (response) => {
        return response.json();
      }
    ).catch(
      (error: any) => {
        return this.errorHandler(error, false);
      }
    );
  }

  public doesReviewExist(workerIds: string[], employerUsername: string): Observable<Object[]> {
    let routeUrl = this.apiUrl + '/workers/reviews/check?employerusername=' + employerUsername;

    return this.httpService.post(routeUrl, workerIds, this.options).map(
      (response) => {
        return response.json();
      }
    ).catch(
      (error: any) => {
        return this.errorHandler(error);
      }
    );
  }
}
