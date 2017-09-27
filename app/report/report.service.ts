import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Report } from './Report';
import { BaseService } from '../core/services/base.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { NotificationService } from '../core/services/notification.service';

@Injectable()
export class ReportService extends BaseService<Report> {
  constructor (private http: Http, authorizationService: AuthorizationService,
    notificationService: NotificationService, router: Router) {
    super('reports', http, authorizationService, notificationService, router);
  }

  public create(report: Report): Observable<Report> {
    if (!this.options) this.initOptions();

    return this.httpService.post(this.apiUrl, report, this.options)
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
}
