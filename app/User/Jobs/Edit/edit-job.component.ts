import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

import { JobService } from '../../../Job/job.service';
import { Helper } from '../../../helper';
import { Option } from '../../../global-types';
import { CITIES, PROFESSIONS } from '../../../global-consts';
import { Job } from '../../../Job/Job';

@Component({
  moduleId: module.id,
  selector: 'app-edit-job',
  templateUrl: 'edit-job.component.html'
})

export class EditJobComponent implements OnInit {
  editJobForm: FormGroup;
  selected: Option[];
  regions: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  job: Job;

  constructor(public activeModal: NgbActiveModal, private jobService: JobService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.editJobForm = this.formBuilder.group({
      region: this.job.region,
      profession: this.job.profession,
      description: this.job.description
    });
  }

  init(job: Job) {
    this.job = job;
  }

  submit(): void {
    let job: Job = new Job();

    job.id = this.job.id;
    if (Helper.submitForm(this.editJobForm, job)) {
      this.jobService.update(job).subscribe(
        (result) => {
          Object.assign(this.job, result);
          this.activeModal.close(this.job);
        }
      );
    }
  }

  close(): void {
    this.activeModal.dismiss('close');
  }
}
