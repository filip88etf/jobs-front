import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../core/services/toast.service';
import { GlobalValidators } from '../../global-validators';
import { Employer } from '../Employer';
import { GENDER_LIST } from '../../global-consts';
import { Option } from '../../global-types';
import { EmployerService } from '../employer.service';
import { Helper } from '../../helper';
import { PictureCropperComponent } from '../../shared/picture-cropper/picture-cropper.component';

@Component({
  moduleId: module.id,
  selector: 'app-edit-employer',
  templateUrl: 'edit-employer.component.html',
  styles: ['.upload-button { width: 200px !important; }']
})

export class EditEmployerComponent implements OnInit {
  employer: Employer;
  selected: Option[] = [GENDER_LIST[0]];
  options: Option[] = GENDER_LIST;
  editForm: FormGroup;
  calendarSettings: Object = {};
  ignoreEmail: string;

  constructor(private employerService: EmployerService, private formBuilder: FormBuilder,
    private router: Router, private toastService: ToastService, private modalService: NgbModal) {
  }

  ngOnInit () {
    this.calendarSettings = {
      maxDate: Helper.datePickerFormat(Helper.subtractYear(18)),
      minDate: Helper.datePickerFormat(Helper.subtractYear(70))
    };
    this.employer = new Employer();
    this.editForm = this.formBuilder.group({
      firstName: this.employer.firstName,
      lastName: this.employer.lastName,
      birthday: this.employer.birthday,
      gender: this.employer.gender,
      phone: this.employer.phone,
      email: [this.employer.email, [GlobalValidators.emailValidator]],
    });

    this.employerService.getEmployer().subscribe(
      (response) => {
        this.employer = response;
        this.ignoreEmail = this.employer.email;
        Helper.updateForm(this.editForm, this.employer);
      },
      (error) => { console.log(error); }
    );
  }

  save() {
    let user = Object.assign(new Employer(), this.employer);

    if (Helper.submitForm(this.editForm, user)) {
      this.employerService.update(user).subscribe(
        (response) => {
          Object.assign(this.employer, response);
          this.router.navigate(['/employer/profile']);
          this.toastService.success('You successfully updated your profile!');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  openCropModal() {
    let modalSettings = {
      headerText: 'Upload Profile Picture',
      submitText: 'Upload',
      cancelText: 'Cancel'
    };
    let  modal = this.modalService.open(PictureCropperComponent, {size: 'lg'});

    modal.componentInstance.init(modalSettings);
    modal.result.then(
      (result) => {
        if (result) {
          this.employerService.uploadProfilePicture(result).subscribe(
            (response: any) => { this.employer.imageURL = response; },
            (error) => { console.log(error); }
          );
        }
      },
      (reason) => { }
    );
  }
}
