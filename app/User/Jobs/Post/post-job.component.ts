import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { CITIES, PROFESSIONS } from '../../../global-consts';
import { Option } from '../../../global-types';
import { Job } from '../../../Job/Job';
import { JobService } from '../../../Job/job.service';
import { UserService } from '../../user.service';
import { Helper } from '../../../helper';

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

  constructor(private jobService: JobService, private userService: UserService, private formBuilder: FormBuilder) {
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
    if (Helper.validateForm(this.postJobForm)) {
      Helper.submitForm(this.postJobForm, this.job);
      this.job.userId = this.userService.getUser().id;
      this.jobService.create(this.job).subscribe(
        () => {
          this.onSubmit.emit(this.job);
          this.close();
        }
      );
    }
  }

  open() {
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }
}
