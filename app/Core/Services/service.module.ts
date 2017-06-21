import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthorizationService } from './authorization.service';
import { HttpModule } from '@angular/http';
import { UserService } from '../../User/user.service';
import { WorkerService } from '../../Worker/worker.service';
import { EmployerService } from '../../Employer/employer.service';
import { ToastService } from './toast.service';
import { AuthGuardService } from './auth-guard.service';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [HttpModule]
})

export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [AuthorizationService, ToastService, AuthGuardService,
        EmployerService, UserService, WorkerService, NotificationService]
    };
  }
}
