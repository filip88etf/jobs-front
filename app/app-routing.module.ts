import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './Login/login.component';

const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'user', loadChildren : 'app/User/user.module#UserModule' },
  { path: 'worker', loadChildren: 'app/Worker/worker.module#WorkerModule' },
  { path: 'employer', loadChildren: 'app/Employer/employer.module#EmployerModule' },
  { path: 'workers', loadChildren: 'app/Workers/workers.module#WorkersModule' }
  // { path: 'jobs', loadChildren: 'app/Jobs/jobs.module#JobsModule' }
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
