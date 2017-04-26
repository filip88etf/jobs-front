import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class BaseService <T> {
  apiUrl: string = 'https://jobsy-kp-api.herokuapp.com';
  headers: Headers;
  options: RequestOptions;
  httpService: Http;

  constructor(route: string = '', http: Http) {
    console.log('construt base service for ' + route);
    this.apiUrl += route ? '/' + route : '';
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.httpService = http;
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
        return Observable.throw(error.json());
      }
    );
  }

  create(entity: T): Observable<T> {
    return this.httpService.post(this.apiUrl, entity, this.options).map(
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

  update(entity: T): Observable<T> {
    return this.httpService.put(this.apiUrl, entity, this.options).map(
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

  delete(entity: T): Observable<T> {
    return this.httpService.delete(this.apiUrl, this.options).map(
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
}
