import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Option } from '../../../global-types';
import { CITIES, PROFESSIONS } from '../../../global-consts';
import { Job } from '../../../Job/Job';

@Component({
  moduleId: module.id,
  selector: 'app-edit-job',
  templateUrl: 'edit-job.component.html'
})

export class EditJobComponent {
  selected: Option[];
  locations: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  job: Job;

  constructor(public activeModal: NgbActiveModal) {
  }

  init(job: Job) {
    this.job = job;
  }

  submit(): void {
    this.activeModal.close(this.job);
  }

  close(): void {
    this.activeModal.dismiss('close');
  }
}
