import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Job } from '../../../jobs/Job';
import { JobService } from '../../../jobs/job.service';
import { Worker } from '../../../worker/Worker';
import { WorkerService } from '../../../worker/worker.service';

@Component({
  moduleId: module.id,
  selector: 'app-employer-job',
  templateUrl: 'employer-job-details.component.html',
  styleUrls: ['employer-job-details.component.css']
})

export class EmployerJobDetailsComponent implements OnInit {
  totalNumber: number;
  size: number = 10;
  page: number = 1;
  job: Job;
  candidates: Worker[];

  constructor(private jobService: JobService, private route: ActivatedRoute,
    private workerService: WorkerService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.jobService.get(params['id']).subscribe(
        (job) => {
          this.job = job;
        });
      this.workerService.list().subscribe(
        (response: any) => {
          this.candidates = response.content;
          this.totalNumber = response.page.totalElements;
        });
    });
  }

  public pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.router.navigate(['workers', {page: this.page}]);
  }
}
