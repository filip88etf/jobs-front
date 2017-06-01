import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../User';
import { GENDER_LIST } from '../../../global-consts';
import { Option } from '../../../global-types';
import { UserService } from '../../user.service';
import { Helper } from '../../../helper';
import { PictureCropperComponent } from '../../../Shared/PictureCropper/picture-cropper.component';

@Component({
  moduleId: module.id,
  selector: 'app-edit-user',
  templateUrl: 'edit-user.component.html',
  styles: ['.upload-button { width: 200px !important; }']
})

export class EditUserComponent implements OnInit {
  user: User;
  selected: Option[] = [GENDER_LIST[0]];
  options: Option[] = GENDER_LIST;
  editForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder,
    private router: Router, private toastService: ToastService, private modalService: NgbModal) {
  }

  ngOnInit () {
    this.user = new User();
    this.editForm = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthday: this.user.birthday,
      gender: this.user.gender,
      phone: this.user.phone,
      email: this.user.email
    });

    this.userService.getUser().subscribe(
      (response) => {
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
          this.router.navigate(['/user/profile']);
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
        this.userService.uploadProfilePicture(result).subscribe(
          (response: any) => { this.user.imageURL = response; },
          (error) => { console.log(error); }
        );
      },
      (reason) => { }
    );
  }
}
