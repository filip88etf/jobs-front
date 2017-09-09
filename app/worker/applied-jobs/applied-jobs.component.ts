import { Component, OnInit } from '@angular/core';

import { JobService } from '../../jobs/job.service';

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

  constructor (private jobService: JobService) {
  }

  ngOnInit(): void {
  }
}
