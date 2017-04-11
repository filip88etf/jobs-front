import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { CITIES, PROFESSIONS } from '../../../global-consts';
import { Option } from '../../../global-types';
import { Job } from '../../../Job/Job';
import { JobService } from '../../../Job/job.service';

@Component({
  moduleId: module.id,
  selector: 'app-post-job',
  templateUrl: 'post-job.component.html'
})

export class PostJobComponent implements OnInit {
  selected: Option[];
  locations: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  job: Job;
  @ViewChild('postJobModal') public modal: ModalDirective;
  @Output() onSubmit: EventEmitter<Job> = new EventEmitter<Job>();

  constructor(private jobService: JobService) {
  }

  ngOnInit() {
    this.job = new Job();
  }

  open() {
    this.modal.show();
  }

  postJob(): void {
    this.jobService.create(this.job);
    this.onSubmit.emit(this.job);
    this.close();
  }

  close(): void {
    this.modal.hide();
  }
}
