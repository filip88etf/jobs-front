import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { Worker } from './Worker';
import { BaseService } from '../base.service';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class WorkerService extends BaseService<Worker> {
  constructor(private http: Http, authorizationService: AuthorizationService, router: Router) {
    super('workers', http, authorizationService, router);
  }
}
