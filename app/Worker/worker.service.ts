import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Worker } from './Worker';
import { BaseService } from '../Core/Services/base.service';
import { AuthorizationService } from '../Core/Services/authorization.service';
import { NotificationService } from '../Core/Services/notification.service';

@Injectable()
export class WorkerService extends BaseService<Worker> {
  private worker: Worker;

  constructor(private http: Http, authorizationService: AuthorizationService,
    notificationService: NotificationService, router: Router) {
    super('workers', http, authorizationService, notificationService, router);
  }

  public getWorker(): Observable<Worker> {
    if (!this.options) { this.initOptions(); }
    if (!this.worker) {
      return this.getByUsername(localStorage.getItem('username'));
    }
    return Observable.of(this.worker);
  }

  public getDetails(username: string): Observable<Worker> {
    let routeUrl = '/search/findByUsername?username=' + username;

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        function success(response: Response): any {
          let worker = new Worker();
          Object.assign(worker, response.json());
          return worker;
      }.bind(this))
      .catch(
        function fail(error: any): any {
          console.log(error);
        }.bind(this)
      );
  }

  public getByUsername(username: string): Observable<Worker> {
    let routeUrl = '/search/findByUsername?username=' + username;
    this.initOptions();

    return this.http.get(this.apiUrl + routeUrl, this.options)
      .map(
        function success(response: Response): any {
          this.worker = this.worker || new Worker();
          Object.assign(this.worker, response.json());
          this.worker.region = this.worker.region.split(',');
          localStorage.setItem('username', this.worker.username);
          return this.worker;
      }.bind(this))
      .catch(
        function fail(error: any): any {
          return this.errorHandler(error);
        }.bind(this)
      );
  }

  public uploadProfilePicture(picture: any): Observable<boolean> {
    let routeUrl = '/profile/image?username=' + this.worker.username;

    this.notificationService.startLoading();
    return this.http.post(this.apiUrl + routeUrl, picture, this.options)
      .map(
        function success(response: any): boolean {
          this.notificationService.stopLoading();
          return response['_body'];
        }.bind(this)
      )
      .catch(
        function fail(error: any): any {
          this.notificationService.stopLoading();
          return this.errorHandler(error);
        }
      );
  }

  public logOut() {
    this.worker = null;
    this.clearStorage();
    this.router.navigate(['/user/login']);
  }

  public setWorker(worker: Worker): void {
    this.worker = worker;
    this.worker.region = this.worker.region.toString().split(',');
  }
}
