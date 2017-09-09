import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../../core/services/toast.service';
import { Job } from '../../../jobs/Job';
import { JobService } from '../../../jobs/job.service';
import { Worker } from '../../../worker/Worker';
import { WorkerService } from '../../../worker/worker.service';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { EditJobComponent } from '../edit/edit-job.component';
import { ReviewModalComponent } from '../review-modal/review-modal.component';

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
  acceptedCandidates: Worker[] = [];

  constructor(private jobService: JobService, private route: ActivatedRoute, private toastService: ToastService,
    private workerService: WorkerService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.jobService.get(params['id']).subscribe(
        (job) => {
          this.job = job;
          this.workerService.getAcceptedCandidates(job.id).subscribe(
            (acceptedCandidates) => {
              this.acceptedCandidates = acceptedCandidates;
            }
          );
        });
      this.workerService.getCandidates(params).subscribe(
        (response: any) => {
          this.candidates = response.content;
          this.totalNumber = response.page.totalElements;
        });
    });
  }

  public pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.router.navigate(['employer/job', { id: this.job.id, page: this.page }]);
  }

  public candidateAccepted(worker: Worker) {
    this.job.status = 'In Progress';
    this.acceptedCandidates.push(worker);
  }

  public openCancelJobModal(): void {
    let modal = this.modalService.open(ConfirmModalComponent);

    modal.componentInstance.init('Cancel Job',
      'If you cancel the job you won\'t be able to add review to worker who work on this job. ' +
      'Your job won\'t be visible any more.',
       'Cancel Job', 'Don\'t Cancel');
    modal.result.then(
      (result) => { this.cancelJob(); },
      (reason) => { }
    );
  }

  public cancelJob(): void {
    this.jobService.delete(this.job.id).subscribe(
      (response: any) => {
        this.toastService.success('Job is canceld!');
        this.router.navigate(['employer/jobs', {page: 1}]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public openEditJobModal(): void {
    let modal = this.modalService.open(EditJobComponent, {size: 'lg'});

    modal.componentInstance.init(this.job);
    modal.result.then(
      (result) => { this.toastService.success('You updated your job!'); },
      (reason) => { }
    );
  }

  public openDoneJobModal(): void {
    let modal = this.modalService.open(ReviewModalComponent, {size: 'lg'});

    modal.componentInstance.init(this.acceptedCandidates);
    modal.result.then(
      (result) => {
        this.toastService.success('Your job is done!');
        this.router.navigate(['employer/jobs', {page: 1}]);
      },
      (reason) => { }
    );
  }
}
