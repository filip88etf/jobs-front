import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { WorkersComponent } from './workers/workers.component';
import { WorkersListComponent } from './list/workers-list.component';
import { FilterWorkersComponent } from './filter/filter-workers.component';
import { WorkerItemComponent } from './worker-item/worker-item.component';
import { WorkerDetailsComponent } from './details/worker-details.component';

export const workersRoutes: Routes = [
  { path: '', component: WorkersComponent },
  { path: 'details', component: WorkerDetailsComponent }
];

@NgModule({
  imports: [ FormsModule, ReactiveFormsModule, RouterModule.forChild(workersRoutes),
      NgbModule, SharedModule, CommonModule ],
  declarations: [ WorkersComponent, FilterWorkersComponent, WorkersListComponent, WorkerItemComponent,
      WorkerDetailsComponent ]
})

export class WorkersModule {
}
