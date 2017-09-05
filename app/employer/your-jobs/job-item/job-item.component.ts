import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../../core/services/toast.service';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { Helper } from '../../../helper';
import { JobService } from '../../../jobs/job.service';
import { EditJobComponent } from '../edit/edit-job.component';
import { Job } from '../../../jobs/Job';

@Component({
  moduleId: module.id,
  selector: 'app-your-job',
  templateUrl: 'job-item.component.html',
  styleUrls: ['job-item.component.css']
})

export class JobItemComponent {
  noPicture: string = 'assets/images/no-job-picture.png';
  @Input() job: Job;
  @Output() onCancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEdit: EventEmitter<Job> = new EventEmitter<Job>();

  constructor(private jobService: JobService, private toastService: ToastService, private router: Router,
    private modalService: NgbModal) {
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
        this.onCancel.emit(this.job.id);
        this.router.navigate(['employer/jobs']);
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

  public openJobDetails(): void {
    this.router.navigate(['employer/job', { id: this.job.id, page: 1 }]);
  }
}
