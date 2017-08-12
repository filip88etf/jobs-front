import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthorizationService } from './authorization.service';
import { NotificationService } from './notification.service';

export class BaseService <T> {
  apiUrl: string = 'https://jobsy-kp-api.herokuapp.com';
  headers: Headers;
  options: RequestOptions;
  httpService: Http;
  authorizationService: AuthorizationService;
  router: Router;
  pageSize: number = 10;

  constructor(route: string = '', http: Http, authorizationService: AuthorizationService,
    protected notificationService: NotificationService, router: Router) {
    this.apiUrl += route ? '/' + route : '';
    this.httpService = http;
    this.authorizationService = authorizationService;
    this.router = router;
  }

  public get(id: string): Observable<T> {
    let url = this.apiUrl + '/' + id;

    return this.httpService.get(url).map(
      (response: Response) => {
        return response.json();
      }
    )
    .catch(
      (error: any) => {
        return this.errorHandler(error, false);
      }
    );
  }

  public list(params: any): Observable<T[]> {
    params.size = this.pageSize;
    let url = this.apiUrl + '/search/findByRegionContainingAndProfessionContaining?' + this.encodeUrl(params);

    return this.httpService.get(url).map(
      function success(response: Response) {
        return response.json();
      })
    .catch(
      function fail(error: any) {
        return this.errorHandler(error, false);
      }.bind(this)
    );
  }

  public create(entity: T): Observable<T> {
    let options = new RequestOptions({ headers: new Headers({'Content-Type': 'application/json'}) });
    this.mapEntityForBackend(entity);

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

  public update(entity: T): Observable<T> {
    this.mapEntityForBackend(entity);
    return this.httpService.patch(this.apiUrl + '/' + entity['id'], entity, this.options).map(
      function success (response: Response) {
        return response.json();
      })
    .catch(
      function fail (error: any) {
        return this.errorHandler(error);
      }.bind(this)
    );
  }

  public delete(id: string): Observable<boolean> {
    return this.httpService.delete(this.apiUrl + '/' + id, this.options).map(
      function success (response: Response) {
        return response.json();
      })
    .catch(
      function fail (error: any) {
        return this.errorHandler(error);
      }.bind(this)
    );
  }

  public errorHandler(error: any, redirect: boolean = true) {
    switch (error.status) {
      case 401:
        this.authorizationService.refreshAccessToken().subscribe(
          (response: Response) => { location.reload(); },
          (error: any) => {
            if (redirect) {
              this.router.navigate(['user/login']);
            }
          }
        );
        return Observable.throw(error);
      case 404:
        return Observable.throw(error);
      default:
        return Observable.throw(error);
    }
  }

  public initOptions () {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  protected clearStorage(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('username');
  }

  private mapEntityForBackend(entity: T): void {
    for (let property in entity) {
      if (entity[property] && Array.isArray(entity[property])) {
        entity[property] = entity[property].toString();
      }
    }
  }

  private encodeUrl(data: Object): string {
    let encodedUrl: string = '';

    for (let property in data) {
      encodedUrl += property + '=' + data[property] + '&';
    }
    encodedUrl = encodedUrl.length ? encodedUrl.slice(0, encodedUrl.length - 1) : encodedUrl;

    return encodedUrl;
  }
}
