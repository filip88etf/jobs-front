import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../Shared/shared.module';
import { WorkersComponent } from './Workers/workers.component';
import { WorkersListComponent } from './List/workers-list.component';
import { FilterWorkersComponent } from './Filter/filter-workers.component';
import { WorkerItemComponent } from './WorkerItem/worker-item.component';

export const workersRoutes: Routes = [
  { path: '', component: WorkersComponent }
];

@NgModule({
  imports: [ FormsModule, ReactiveFormsModule, RouterModule.forChild(workersRoutes),
    NgbModule, SharedModule, CommonModule ],
  declarations: [ WorkersComponent, FilterWorkersComponent, WorkersListComponent, WorkerItemComponent ]
})

export class WorkersModule {
}
