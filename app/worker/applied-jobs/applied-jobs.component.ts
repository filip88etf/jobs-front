import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Job } from '../../jobs/Job';
import { JobService } from '../../jobs/job.service';
import { ApplicationService } from '../../applications/application.service';
import { WorkerService } from '../worker.service';
import { Application } from '../../applications/Application';
import { RequestReviewModal } from '../request-review/request-review.modal';

@Component({
  moduleId: module.id,
  selector: 'app-applied-jobs',
  templateUrl: 'applied-jobs.component.html',
  styleUrls: ['applied-jobs.component.css']
})

export class AppliedJobsComponent implements OnInit {
  jobs: Job[];
  page: number = 1;
  totalNumber: number = 0;
  size: number = 10;

  constructor (private jobService: JobService, private workerService: WorkerService, private router: Router,
    private applicationService: ApplicationService, private modalService: NgbModal, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.workerService.getWorker().subscribe((worker) => {
      this.applicationService.getByWorkerId(worker.id).subscribe(
        (applications: any) => {
          this.fetchAppliedJobs(applications);
        }
      );
    });
  }

  public openRequestReviewModal(): void {
    let modal = this.modalService.open(RequestReviewModal, {size: 'lg'});

    modal.result.then(
      (result) => {  },
      (reason) => {  }
    );
  }

  public pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.router.navigate(['worker/jobs', { page: this.page }]);
  }

  private fetchAppliedJobs(applications: any) {
    this.route.params.subscribe((params: Params) => {
      this.jobService.getAppliedJobs(applications, params['page']).subscribe(
        (response: any) => {
          this.jobs = response.content;
          this.totalNumber = response.page.totalElements;
        }
      );
    });
  }
}
