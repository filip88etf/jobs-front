import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthorizationService } from './authorization.service';

export class BaseService <T> {
  apiUrl: string = 'https://jobsy-kp-api.herokuapp.com';
  headers: Headers;
  options: RequestOptions;
  httpService: Http;
  authorizationService: AuthorizationService;
  router: Router;

  constructor(route: string = '', http: Http, authorizationService: AuthorizationService, router: Router) {
    console.log('construt base service for ' + route);
    this.apiUrl += route ? '/' + route : '';
    this.httpService = http;
    this.authorizationService = authorizationService;
    this.router = router;
    this.initOptions();
  }

  initOptions () {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getById(entityId: string) {
  }

  list(): Observable<T[]> {
    return this.httpService.get(this.apiUrl).map(
      function success(response: Response) {
        return response.json();
      })
    .catch(
      function fail(error: any) {
        return this.errorHandler(error);
      }.bind(this)
    );
  }

  create(entity: T): Observable<T> {
    let options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/json'}) });

    return this.httpService.post(this.apiUrl, entity, options)
      .map(
        function success (response: Response) {
          return response.json();
        })
      .catch(
        function fail (error: Error) {
          return this.errorHandler(error);
        }.bind(this)
      );
  }

  update(entity: T): Observable<T> {
    return this.httpService.put(this.apiUrl, entity, this.options).map(
      function success (response: Response) {
        return response.json();
      })
    .catch(
      function fail (error: any) {
        return this.errorHandler(error);
      }.bind(this)
    );
  }

  delete(entity: T): Observable<T> {
    return this.httpService.delete(this.apiUrl, this.options).map(
      function success (response: Response) {
        return response.json();
      })
    .catch(
      function fail (error: any) {
        return this.errorHandler(error);
      }.bind(this)
    );
  }

  errorHandler(error: any) {
    switch (error.status) {
      case 401:
        this.authorizationService.refreshAccessToken().subscribe(
          (response: Response) => { location.reload(); },
          (error: any) => { this.router.navigate(['user/login']); }
        );
        return Observable.throw(error);
      case 404:
        return Observable.throw(error);
      default:
        return Observable.throw(error);
    }
  }
}
