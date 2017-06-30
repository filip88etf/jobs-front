import { Component, Input } from '@angular/core';

import { Worker } from '../../Worker/Worker';

@Component({
  moduleId: module.id,
  selector: 'app-worker-item',
  templateUrl: 'worker-item.component.html',
  styleUrls: ['worker-item.component.css']
})

export class WorkerItemComponent {
  @Input() worker: Worker;

  public openWorkerDetails() {
    console.log('click on image');
  }

  public shareOnFacebook() {
  }

  public report() {
  }
}
