import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  @ViewChild('postJobModal') public modal: ModalDirective;
  @Output() onSubmit: EventEmitter<Job> = new EventEmitter<Job>();
  locations: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  job: Job;
  postJobForm: FormGroup;

  constructor(private jobService: JobService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.job = new Job();
    this.postJobForm = this.formBuilder.group({
      location: null,
      profession: null,
      description: ''
    });
  }

  postJob(): void {
    for (let control in this.postJobForm.controls) {
      this.postJobForm.controls[control].updateValueAndValidity();
    }
  }

  open() {
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }
}
