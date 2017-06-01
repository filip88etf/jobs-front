import { Component, ViewChild, Input } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-picture-cropper',
  templateUrl: 'picture-cropper.component.html',
  styleUrls: ['picture-cropper.component.css']
})

export class PictureCropperComponent {
  data: any;
  cropperSettings: CropperSettings;
  noPicture: string = 'assets/images/no-profile-pic.png';
  @Input() modalSettings: Object;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(public activeModal: NgbActiveModal) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.allowedFilesRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
    this.data = {};
  }

  init(modalSettings: Object = {}, cropWidth: number = 200, cropHeight: number = 200) {
    this.modalSettings = modalSettings;
    this.cropperSettings.croppedWidth = cropWidth;
    this.cropperSettings.croppedHeight = cropHeight;
  }

  fileChange(event: any) {
    let image: any = new Image(),
        file: File = event.target.files[0],
        myReader: FileReader = new FileReader();

    myReader.onloadend = (loadEvent: any) => {
        image.src = loadEvent.target.result;
        this.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  submit() {
    this.activeModal.close(this.data.image);
  }

  close() {
    this.activeModal.dismiss('close');
  }
}
