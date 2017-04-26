import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';

const accessTokenUrl: string = 'https://jobsy-kp-api.herokuapp.com/oauth/token';

@Injectable()
export class AuthorizationService {
  private accessToken: string;
  private refreshToken: string;
  private tokenType: string;

  constructor(private http: Http) {
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
      username: username,
      password: password
    };
    let options = new RequestOptions({headers: headers});

    return this.http.post(accessTokenUrl, this.encodeUrl(data), options)
      .map(
        function success(response: Response): any {
          let authData = response.json();
          localStorage.setItem('accessToken', authData.access_token);
          localStorage.setItem('refreshToken', authData.refresh_token);
          localStorage.setItem('tokenType', authData.token_type);
          return authData;
        }
      )
      .catch(
        function fail(): any {
          console.log('authorization has faild');
        }
      );
  }

  public refreshAccessToken(): any {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Zm9vOmZvb3NlY3JldA=='
    });
    let data = {
      grant_type: 'refresh_token',
      client_id: 'foo',
      client_secret: 'foosecret',
      refresh_token: localStorage.getItem('refreshToken')
    };
    let options = new RequestOptions({headers: headers});

    return this.http.post(accessTokenUrl, this.encodeUrl(data), options)
      .map(
        function success(response: Response): any {
          let authData = response.json();
          localStorage.setItem('accessToken', authData.access_token);
          localStorage.setItem('refreshToken', authData.refresh_token);
          localStorage.setItem('tokenType', authData.token_type);
          return authData;
        }
      );
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
