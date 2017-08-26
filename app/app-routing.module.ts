import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'user', loadChildren : 'app/user/user.module#UserModule' },
  { path: 'worker', loadChildren: 'app/worker/worker.module#WorkerModule' },
  { path: 'employer', loadChildren: 'app/employer/employer.module#EmployerModule' },
  { path: 'workers', loadChildren: 'app/workers/workers.module#WorkersModule' },
  { path: 'jobs', loadChildren: 'app/jobs/jobs.module#JobsModule' }
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
