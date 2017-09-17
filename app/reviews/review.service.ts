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
    super('reviews', http, authorizationService, notificationService, router);
  }

  public createReviews(reviews: Object[]): Observable<Review[]> {
    let routeUrl = this.apiUrl + '/bulk';
    if (!this.options) this.initOptions();

    return this.httpService.post(routeUrl, reviews, this.options).map(
      (response) => {
        return response.json();
      }
    ).catch(
      function fail(error: any) {
        return this.errorHandler(error, false);
      }.bind(this)
    );
  }
}
