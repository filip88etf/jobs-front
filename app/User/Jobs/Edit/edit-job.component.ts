import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

import { JobService } from '../../../Jobs/job.service';
import { Helper } from '../../../helper';
import { Option } from '../../../global-types';
import { CITIES, PROFESSIONS } from '../../../global-consts';
import { Job } from '../../../Jobs/Job';

@Component({
  moduleId: module.id,
  selector: 'app-edit-job',
  templateUrl: 'edit-job.component.html',
  styles: ['.image-cropper { padding: 20px 0px }']
})

export class EditJobComponent implements OnInit {
  editJobForm: FormGroup;
  selected: Option[];
  regions: Option[] = CITIES;
  professions: Option[] = PROFESSIONS;
  cropperSettings: CropperSettings;
  data: Object;
  job: Job;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(public activeModal: NgbActiveModal, private jobService: JobService,
    private formBuilder: FormBuilder) {
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.noFileInput = true;
      this.cropperSettings.allowedFilesRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
      this.data = {};
  }

  ngOnInit() {
    this.editJobForm = this.formBuilder.group({
      region: this.job.region,
      profession: this.job.profession,
      description: this.job.description
    });
  }

  public init(job: Job) {
    this.job = job;
  }

  public submit(): void {
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

  public fileChange(event: any) {
    let image: any = new Image(),
        file: File = event.target.files[0],
        myReader: FileReader = new FileReader();

    myReader.onloadend = (loadEvent: any) => {
        image.src = loadEvent.target.result;
        this.job.imageURL = image.src;
        this.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }


  public close(): void {
    this.activeModal.dismiss('close');
  }
}
