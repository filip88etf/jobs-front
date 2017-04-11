import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthorizationService } from './authorization.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [HttpModule]
})

export class AuthorizationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthorizationModule,
      providers: [AuthorizationService]
    };
  }
}
