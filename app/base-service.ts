import { Headers, RequestOptions } from '@angular/http';

export class BaseService {
  apiUrl: string = 'https://jobsy-kp-api.herokuapp.com';
  headers: Headers;
  options: RequestOptions;
  constructor(route: string = '') {
    this.apiUrl += route ? '/' + route : '';
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenType') + ' ' + localStorage.getItem('accessToken')
    });
    this.options = new RequestOptions({ headers: this.headers });
  }
}
