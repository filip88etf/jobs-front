import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApplyModalComponent } from '../apply-modal/apply-modal.component';
import { JobService } from '../job.service';
import { Job } from '../Job';
import { User } from '../../user/User';
import { Application } from '../../applications/Application';

@Component({
  moduleId: module.id,
  selector: 'app-job-item',
  templateUrl: 'job-item.component.html',
  styleUrls: ['job-item.component.css']
})

export class JobItemComponent implements OnInit {
  @Input() job: Job;
  @Input() applications: Application[];
  @Input() loggedUser: User;
  isApplied = false;
  isQualified = false;

  constructor(private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.checkCanApply();
  }

  public openJobDetails(): void {
    this.router.navigate(['jobs/details', { id: this.job.id, username: this.job.username }]);
  }

  public apply (): void {
    let modal = this.modalService.open(ApplyModalComponent);

    modal.componentInstance.init(this.job, this.loggedUser);
    modal.result.then(
      (result) => {
        this.isApplied = true;
        this.applications.push(result);
      },
      (reason) => { }
    );
  }

  private checkCanApply(): void {
    if (this.applications) {
      for (let i = 0; i < this.applications.length; i++) {
        if (this.applications[i]['jobId'] === this.job.id) {
          this.isApplied = true;
        }
      }
    }
    if (this.loggedUser.type === 'worker' && this.job.profession === this.loggedUser['profession']) {
      this.isQualified = true;
    }
  }

  public report(): void {
  }
}
