import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

import { CITIES, PROFESSIONS } from '../../../global-consts';
import { NotificationService } from '../../../Core/Services/notification.service';
import { Option } from '../../../global-types';
import { Job } from '../../../Jobs/Job';
import { JobService } from '../../../Jobs/job.service';
import { User } from '../../../User/User';
import { UserService } from '../../../User/user.service';
import { Helper } from '../../../helper';

@Component({
  moduleId: module.id,
  selector: 'app-post-job',
  templateUrl: 'post-job.component.html',
  styles: ['.image-cropper { padding: 20px 0px }']
})

export class PostJobComponent implements OnInit {
  regions: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  cropperSettings: CropperSettings;
  data: Object;
  job: Job;
  user: User;
  noPicture: string = 'assets/images/no-job-picture.png';
  postJobForm: FormGroup;
  imageURL: string;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(private jobService: JobService, private userService: UserService, private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal, private notificationService: NotificationService) {
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.noFileInput = true;
      this.cropperSettings.allowedFilesRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
      this.data = {};
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

  public submit() {
    if (Helper.submitForm(this.postJobForm, this.job)) {
      this.job.username = this.user.username;
      this.notificationService.startLoading();
      this.jobService.create(this.job).subscribe(
        (job) => {
          this.job = job;
          if (this.imageURL) {
            this.jobService.uploadPicture(this.imageURL, job.id).subscribe(
              (image: any) => {
                this.job.imageURL = image;
                this.activeModal.close(this.job);
              },
              (error: any) => {
                this.activeModal.close();
              }
            );
          } else {
            this.activeModal.close(this.job);
            this.notificationService.stopLoading();
          }
        },
        (error: any) => {}
      );
    }
  }

  public fileChange(event: any) {
    let image: any = new Image(),
        file: File = event.target.files[0],
        myReader: FileReader = new FileReader();

    myReader.onloadend = (loadEvent: any) => {
        image.src = loadEvent.target.result;
        this.imageURL = image.src;
        this.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  public close() {
    this.activeModal.dismiss('close');
  }
}
