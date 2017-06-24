import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../Shared/shared.module';
import { UserModule } from '../User/user.module';
import { EditWorkerComponent } from './Edit/edit-worker.component';
import { AuthGuardService } from '../Core/Services/auth-guard.service';
import { UserJobsComponent } from '../User/Jobs/user-jobs.component';
import { ProfileComponent } from '../User/Profile/profile.component';
import { UserMenuComponent } from '../User/Menu/user-menu.component';

export const workerRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  { path: 'profile', canActivate: [AuthGuardService], component: UserMenuComponent, children:
    [
      { path: '', canActivate: [AuthGuardService], component: ProfileComponent },
      { path: 'edit', canActivate: [AuthGuardService], component: EditWorkerComponent },
      { path: 'jobs', canActivate: [AuthGuardService], component: UserJobsComponent }
    ]
  },
];

@NgModule({
  imports: [ FormsModule, ReactiveFormsModule, SharedModule, CommonModule,
    RouterModule.forChild(workerRoutes), UserModule ],
  declarations: [EditWorkerComponent],
  exports: [EditWorkerComponent]
})

export class WorkerModule {}
