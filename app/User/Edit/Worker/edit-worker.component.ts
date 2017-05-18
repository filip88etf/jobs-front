import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../toast.service';

import { User } from '../../User';
import { Worker } from '../../../Worker/Worker';
import { PROFESSIONS, CITIES, GENDER_LIST } from '../../../global-consts';
import { Option } from '../../../global-types';
import { UserService } from '../../user.service';
import { WorkerService } from '../../../Worker/worker.service';
import { Helper } from '../../../helper';

@Component({
  moduleId: module.id,
  selector: 'app-edit-worker',
  templateUrl: 'edit-worker.component.html',
  styles: ['.upload-button { width: 200px !important; }']
})

export class EditWorkerComponent implements OnInit {
  user: User;
  worker: Worker;
  selected: Option[] = [GENDER_LIST[0]];
  options: Option[] = GENDER_LIST;
  editForm: FormGroup;
  regions: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  constructor(private userService: UserService, private workerService: WorkerService, private formBuilder: FormBuilder,
    private router: Router, private toastService: ToastService) {
  }

  ngOnInit () {
    this.user = new User();
    this.worker = new Worker();
    this.editForm = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      gender: this.user.gender,
      phone: this.user.phone,
      email: this.user.email,
      profession: this.worker.profession,
      region: this.worker.region,
      description: this.worker.description
    });

    this.userService.getUser().subscribe(
      (response) => {
        this.workerService.getWorker(response.id).subscribe(
          (worker: Worker) => {
            this.worker = worker;
            Helper.updateForm(this.editForm, this.worker);
          }
        );
        this.user = response;
        Helper.updateForm(this.editForm, this.user);

      },
      (error) => { console.log(error); }
    );
  }

  save() {
    let user = Object.assign(new User(), this.user);

    if (Helper.submitForm(this.editForm, user)) {
      this.userService.update(user).subscribe(
        (response) => {
          Object.assign(this.user, response);
          this.updateWorker();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  private updateWorker() {
    let worker = Object.assign(new Worker(), this.worker);

    worker.profession = this.editForm.get('profession').value;
    worker.region = this.editForm.get('region').value.toString();
    worker.description = this.editForm.get('description').value;

    this.workerService.update(worker).subscribe(
      (response) => {
        Object.assign(this.worker, response);
        this.worker.region = response.region.toString().split(',');
        this.router.navigate(['/user/profile']);
        this.toastService.success('You successfully updated your profile!');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
