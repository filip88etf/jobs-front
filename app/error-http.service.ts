import { XHRBackend, Request, XHRConnection, BrowserXhr, ResponseOptions, XSRFStrategy, Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ErrorHttpService extends XHRBackend {

  constructor(_browserXhr: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy) {
      super(_browserXhr, _baseResponseOptions, _xsrfStrategy);
  }

  createConnection(request: Request): XHRConnection {
    let connection: XHRConnection = super.createConnection(request);
    // Before returning the connection we try to catch all possible errors(4XX,5XX and so on)
    connection.response = connection.response.catch(this.processResponse);
    return connection;
  }

  processResponse(response: Response) {
    switch (response.status) {
      case 401:
        return Observable.throw(response);
      case 403:
        return Observable.throw(response);
      case 404:
        return Observable.throw(response);
      default:
        return Observable.throw(response);
    }
  }

}
