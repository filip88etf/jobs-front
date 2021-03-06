import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthorizationService } from './authorization.service';
import { HttpModule } from '@angular/http';
import { UserService } from '../../user/user.service';
import { WorkerService } from '../../worker/worker.service';
import { EmployerService } from '../../employer/employer.service';
import { ReviewService } from '../../reviews/review.service';
import { ApplicationService } from '../../applications/application.service';
import { ToastService } from './toast.service';
import { AuthGuardService } from './auth-guard.service';
import { NotificationService } from './notification.service';
import { ReportService } from '../../report/report.service';

@NgModule({
  imports: [HttpModule]
})

export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [AuthorizationService, ToastService, AuthGuardService, ReviewService, ReportService,
        EmployerService, UserService, WorkerService, NotificationService, ApplicationService]
    };
  }
}
