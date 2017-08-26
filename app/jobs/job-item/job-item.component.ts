import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { JobService } from '../job.service';
import { Job } from '../Job';

@Component({
  moduleId: module.id,
  selector: 'app-job-item',
  templateUrl: 'job-item.component.html',
  styleUrls: ['job-item.component.css']
})

export class JobItemComponent {
  @Input() job: Job;

  constructor(private router: Router) {
  }

  public openJobDetails() {
    this.router.navigate(['jobs/details', { id: this.job.id, username: this.job.username }]);
  }

  public report() {
  }
}
