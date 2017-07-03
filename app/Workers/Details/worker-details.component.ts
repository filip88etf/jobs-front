import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { WorkerService } from '../../Worker/worker.service';

@Component({
  moduleId: module.id,
  selector: 'app-worker-details',
  templateUrl: 'worker-details.component.html',
  styleUrls: ['worker-details.component.css']
})

export class WorkerDetailsComponent implements OnInit {
  worker: Worker;

  constructor(private workerService: WorkerService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.workerService.getByUsername(params['username']).subscribe(() => {
      });
    });
  }
}
