import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CITIES, PROFESSIONS } from '../../../global-consts';
import { Option } from '../../../global-types';
import { Job } from '../../../Job/Job';
import { JobService } from '../../../Job/job.service';
import { User } from '../../User';
import { UserService } from '../../user.service';
import { Helper } from '../../../helper';

@Component({
  moduleId: module.id,
  selector: 'app-post-job',
  templateUrl: 'post-job.component.html'
})

export class PostJobComponent implements OnInit {
  regions: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  job: Job;
  user: User;
  postJobForm: FormGroup;

  constructor(private jobService: JobService, private userService: UserService,
    private formBuilder: FormBuilder, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.job = new Job();
    this.postJobForm = this.formBuilder.group({
      region: null,
      profession: null,
      description: ''
    });
    this.userService.getUser().subscribe(
      (user) => { this.user = user; }
    );
  }

  submit() {
    if (Helper.submitForm(this.postJobForm, this.job)) {
      this.job.userId = this.user.id;
      this.jobService.create(this.job).subscribe(
        (job) => {
          this.activeModal.close(job);
        }
      );
    }
  }

  close() {
    this.activeModal.dismiss('close');
  }
}
