import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { WorkerService } from '../../Worker/worker.service';
import { Worker } from '../../Worker/Worker';

@Component({
  moduleId: module.id,
  selector: 'app-worker-item',
  templateUrl: 'worker-item.component.html',
  styleUrls: ['worker-item.component.css']
})

export class WorkerItemComponent {
  @Input() worker: Worker;

  constructor(private router: Router) {
  }

  public openWorkerDetails() {
    this.router.navigate(['workers/details', { username: this.worker.username}]);
  }

  public report() {
  }
}
