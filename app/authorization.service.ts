import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AuthorizationService {
  private accessTokenUrl: string = 'https://jobsy-kp-api.herokuapp.com/oauth/token';

  constructor(private http: Http) {
    console.log('Constructor of Authorization Serivce is executed!');
  }

  public authorize(username: string, password: string): any {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Zm9vOmZvb3NlY3JldA=='
    });
    let data = {
      grant_type: 'password',
      client_id: 'foo',
      client_secret: 'foosecret',
      username: 'bar',
      password: 'barsecret'
    };
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.accessTokenUrl, this.encodeUrl(data), options)
      .map(
        function success(response: Response): any {
          return response.json();
        }
      )
      .catch(
        function fail(error: Response): any {
          console.error(error.json());
      });
  }

  private encodeUrl(data: Object) {
    let encodedUrl: string = '';

    for (let property in data) {
      encodedUrl += property + '=' + data[property] + '&';
    }
    encodedUrl = encodedUrl.length ? encodedUrl.slice(0, encodedUrl.length - 1) : encodedUrl;

    return encodedUrl;
  }
}
