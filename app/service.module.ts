import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthorizationService } from './authorization.service';
import { HttpModule } from '@angular/http';
import { UserService } from './User/user.service';
import { ErrorHttpService } from './error-http.service';

@NgModule({
  imports: [HttpModule]
})

export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [AuthorizationService, UserService, ErrorHttpService]
    };
  }
}
