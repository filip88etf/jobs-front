import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { EditWorkerComponent } from './edit/edit-worker.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { UserComponent } from '../user/user/user.component';
import { AppliedJobComponent } from './applied-job/applied-job.component';
import { RequestReviewModal } from './request-review/request-review.modal';

export const workerRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  { path: 'jobs', canActivate: [AuthGuardService], component: AppliedJobsComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: UserComponent, children:
    [
      { path: '', canActivate: [AuthGuardService], component: ProfileComponent },
      { path: 'edit', canActivate: [AuthGuardService], component: EditWorkerComponent }
    ]
  },
];

@NgModule({
  imports: [ FormsModule, ReactiveFormsModule, SharedModule, CommonModule,
    RouterModule.forChild(workerRoutes), UserModule, NgbModule ],
  declarations: [AppliedJobComponent, EditWorkerComponent, AppliedJobsComponent, RequestReviewModal],
  exports: [EditWorkerComponent],
  entryComponents: [RequestReviewModal]
})

export class WorkerModule {}
