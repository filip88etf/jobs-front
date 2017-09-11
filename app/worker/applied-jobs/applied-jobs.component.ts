import { Component, OnInit } from '@angular/core';

import { JobService } from '../../jobs/job.service';
import { ApplicationService } from '../../applications/application.service';
import { WorkerService } from '../worker.service';
import { Application } from '../../applications/Application';

@Component({
  moduleId: module.id,
  selector: 'app-applied-jobs',
  templateUrl: 'applied-jobs.component.html',
  styleUrls: ['applied-jobs.component.css']
})

export class AppliedJobsComponent implements OnInit {
  page: number = 1;
  totalNumber: number = 0;
  size: number = 10;

  constructor (private jobService: JobService, private workerService: WorkerService,
    private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.workerService.getWorker().subscribe((worker) => {
      this.applicationService.getByWorkerId(worker.id).subscribe(
        (applications: any) => {
        }
      );
    });
  }
}
